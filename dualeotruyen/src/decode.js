function decode_light(hex){
    var key = 22;
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code ^ key);
    }
    return str;
}