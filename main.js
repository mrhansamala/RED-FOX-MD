import dotenv from 'dotenv';
dotenv.config();

import {
    makeWASocket,
    Browsers,
    jidDecode,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    DisconnectReason,
    useMultiFileAuthState,
    getAggregateVotesInPollMessage
} from '@whiskeysockets/baileys';
import { Handler, Callupdate, GroupUpdate } from './config/index.js';
import { Boom } from '@hapi/boom';
import express from 'express';
import pino from 'pino';
import fs from 'fs';
import NodeCache from 'node-cache';
import path from 'path';
import chalk from 'chalk';
import { writeFile } from 'fs/promises';
import moment from 'moment-timezone';
import axios from 'axios';
import fetch from 'node-fetch';
import * as os from 'os';
import config from './config.cjs';
import pkg from './lib/autoreact.cjs';
const { emojis, doReact } = pkg;

const app = express();
const orange = chalk.bold.hex("#FFA500");
const lime = chalk.bold.hex("#32CD32");
const PORT = process.env.PORT || 3000;

const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

const msgRetryCounterCache = new NodeCache();

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const sessionRootDir = path.join(__dirname, 'sessions');

if (!fs.existsSync(sessionRootDir)) {
    fs.mkdirSync(sessionRootDir, { recursive: true });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadSessionData(sessionId, credsPath) {
    const sessdata = sessionId.split("Red_Fox-MD:/")[1];
    const url = `https://pastebin.com/raw/${sessdata}`;
    try {
        const response = await axios.get(url);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        await fs.promises.writeFile(credsPath, data);
        console.log(`🤩 Session Successfully Loaded for ${sessionId} !!`);
    } catch (error) {
        console.error(`Failed to download session data for ${sessionId}:`, error);
        process.exit(1);
    }
}

async function startSession(sessionId) {
    const sessionDir = path.join(sessionRootDir, sessionId);
    const credsPath = path.join(sessionDir, 'creds.json');

    if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
    }

    if (!fs.existsSync(credsPath)) {
        await downloadSessionData(sessionId, credsPath);
    }

    async function start() {
        let initialConnection = true; // Define initialConnection inside the start function

        try {
            const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
            const { version, isLatest } = await fetchLatestBaileysVersion();
            console.log(`🤖 ${sessionId} using WA v${version.join('.')}, isLatest: ${isLatest}`);
            
            const Fox = makeWASocket({
                version,
                logger: pino({ level: 'silent' }),
                printQRInTerminal: true,
                browser: ["RED-FOX_MD", "safari", "3.3"],
                auth: state,
                getMessage: async (key) => {
                    if (store) {
                        const msg = await store.loadMessage(key.remoteJid, key.id);
                        return msg.message || undefined;
                    }
                    return { conversation: "Nonstop Testing" };
                }
            });

            Fox.ev.on('connection.update', (update) => {
                const { connection, lastDisconnect } = update;
                if (connection === 'close') {
                    if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                        start();
                    }
                } else if (connection === 'open') {
                    if (initialConnection) {
                        console.log(chalk.green("Successful️ ✅"));
                        Fox.sendMessage(Fox.user.id, { text: `🦊ʀᴇᴅ-ꜰᴏx-ᴍᴅ ᴅᴇᴠᴏʟᴏᴘɪɴɢ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ* 
> ᴅᴇᴠᴏʟᴘᴇʀ ɴᴜᴍʙᴇʀ :- 94781708673
> ᴅᴇᴠᴏʟᴘᴇʀ ɴᴀᴍᴇ :- ᴍʀ ʜᴀɴꜱᴀᴍᴀʟᴀ
> ɢɪᴛʜᴜʙ :- https://github.com/mrhansamala/RED-FOX-MD.git` });
                        initialConnection = false;
                    } else {
                        console.log(chalk.blue("♻️ Connection reestablished after restart."));
                    }
                }
            });

            Fox.ev.on('creds.update', saveCreds);

            Fox.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Fox, logger));
            Fox.ev.on("call", async (json) => await Callupdate(json, Fox));
            Fox.ev.on("group-participants.update", async (messag) => await GroupUpdate(Fox, messag));

            if (config.MODE === "public") {
                Fox.public = true;
            } else if (config.MODE === "private") {
                Fox.public = false;
            }

            Fox.ev.on('messages.upsert', async (chatUpdate) => {
                try {
                    const mek = chatUpdate.messages[0];
                    if (!mek.key.fromMe && config.AUTO_REACT) {
                        console.log(mek);
                        if (mek.message) {
                            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                            await doReact(randomEmoji, mek, Fox);
                        }
                    }
                } catch (err) {
                    console.error('Error during auto reaction:', err);
                }
            });
        } catch (error) {
            console.error('Critical Error:', error);
            process.exit(1);
        }
    }

    start();
}

const sessionIds = process.env.SESSION_ID.split(',').map(id => id.trim());

(async () => {
    for (const sessionId of sessionIds) {
        await startSession(sessionId);
        await delay(5000);  // 5 seconds delay
    }
})();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

