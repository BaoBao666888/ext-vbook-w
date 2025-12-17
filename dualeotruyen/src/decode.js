function decode(hexString) {
    var key = 0xad;
    var result = '';

    if (!hexString) return ''; 

    for (var i = 0; i < hexString.length; i += 2) {
        var hexPair = hexString.substr(i, 2);
        var charCode = parseInt(hexPair, 16);
        result += String.fromCharCode(charCode ^ key);
    }
    return result;
}