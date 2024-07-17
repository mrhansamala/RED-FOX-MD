const _0x266dca = _0x394d;
(function (_0x35644c, _0x2bf644) {
  const _0x7b2243 = _0x394d, _0xad5d31 = _0x35644c();
  while (true) {
    try {
      const _0x3889fd = -parseInt(_0x7b2243(190)) / 1 * (-parseInt(_0x7b2243(203)) / 2) + parseInt(_0x7b2243(177)) / 3 + -parseInt(_0x7b2243(181)) / 4 * (-parseInt(_0x7b2243(201)) / 5) + parseInt(_0x7b2243(204)) / 6 + parseInt(_0x7b2243(197)) / 7 * (parseInt(_0x7b2243(188)) / 8) + -parseInt(_0x7b2243(209)) / 9 * (-parseInt(_0x7b2243(186)) / 10) + parseInt(_0x7b2243(207)) / 11 * (-parseInt(_0x7b2243(180)) / 12);
      if (_0x3889fd === _0x2bf644) break; else _0xad5d31.push(_0xad5d31.shift());
    } catch (_0x35fcd2) {
      _0xad5d31.push(_0xad5d31.shift());
    }
  }
}(_0x1c77, 284599));
function _0x1c77() {
  const _0x589c7f = ["submit", "error", "22TuGnJG", "gzip", "1116QxodIW", "push", ".ai", "dehaze", "https", "806484XUnwrW", "jimp", "binary", "7115460KRQhmI", "1101112SegLTh", "end", "from", "enhance_image_body.jpg", "Keep-Alive", "10200auxItC", "inferenceengine", "1495776lQsBgM", "://", "26pNiPkU", "multipart/form-data; charset=uttf-8", ".ai/", "recolor", ".vyro", "remini", "https:", "14fIpVXT", "model_version", "concat", "image/jpeg", "5PRstjc", "form-data", "18210QijQUV", "1135494PIrFmO"];
  _0x1c77 = function () {
    return _0x589c7f;
  };
  return _0x1c77();
}
const FormData = require(_0x266dca(202)), Jimp = require(_0x266dca(178));
function _0x394d(_0x5c9705, _0x277c02) {
  const _0x1c7751 = _0x1c77();
  return _0x394d = function (_0x394dc4, _0x5bcb04) {
    _0x394dc4 = _0x394dc4 - 173;
    let _0x28be0f = _0x1c7751[_0x394dc4];
    return _0x28be0f;
  }, _0x394d(_0x5c9705, _0x277c02);
}
async function remini(_0x33b965, _0x34eff3) {
  return new Promise(async (_0x14db15, _0x267c15) => {
    const _0x5e0112 = _0x394d;
    let _0x45d85b = ["enhance", _0x5e0112(193), _0x5e0112(175)];
    _0x45d85b.includes(_0x34eff3) ? _0x34eff3 = _0x34eff3 : _0x34eff3 = _0x45d85b[0];
    let _0x236d30, _0x370778 = new FormData, _0x5c019f = _0x5e0112(176) + _0x5e0112(189) + _0x5e0112(187) + ".vyro" + _0x5e0112(192) + _0x34eff3;
    _0x370778.append(_0x5e0112(198), 1, {"Content-Transfer-Encoding": _0x5e0112(179), contentType: _0x5e0112(191)}), _0x370778.append("image", Buffer[_0x5e0112(183)](_0x33b965), {filename: _0x5e0112(184), contentType: _0x5e0112(200)}), _0x370778[_0x5e0112(205)]({url: _0x5c019f, host: "inferenceengine" + _0x5e0112(194) + _0x5e0112(174), path: "/" + _0x34eff3, protocol: _0x5e0112(196), headers: {"User-Agent": "okhttp/4.9.3", Connection: _0x5e0112(185), "Accept-Encoding": _0x5e0112(208)}}, function (_0x319120, _0x175e8d) {
      const _0xe7b13c = _0x5e0112;
      if (_0x319120) _0x267c15();
      let _0x15e24d = [];
      _0x175e8d.on("data", function (_0x2918a5, _0x2d4e53) {
        const _0x1e12ae = _0x394d;
        _0x15e24d[_0x1e12ae(173)](_0x2918a5);
      }).on(_0xe7b13c(182), () => {
        const _0x3eb77e = _0xe7b13c;
        _0x14db15(Buffer[_0x3eb77e(199)](_0x15e24d));
      }), _0x175e8d.on(_0xe7b13c(206), _0x90e19c => {
        _0x267c15();
      });
    });
  });
}
module.exports[_0x266dca(195)] = remini;
