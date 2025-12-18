function decodeImageLink(urlInput) {
    var KEY = "dualeo_salt_2025";

    function base64Decode(input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output += String.fromCharCode(chr1);

            if (enc3 != 64) output += String.fromCharCode(chr2);
            if (enc4 != 64) output += String.fromCharCode(chr3);
        }
        return output;
    }

    try {

        var lastSlashIndex = urlInput.lastIndexOf('/');
        if (lastSlashIndex === -1) return urlInput;

        var baseUrl = urlInput.slice(0, lastSlashIndex + 1);
        var fullFileName = urlInput.slice(lastSlashIndex + 1);

        var dotIndex = fullFileName.lastIndexOf('.');
        if (dotIndex === -1) return urlInput;

        var extension = fullFileName.slice(dotIndex + 1);
        var encryptedName = fullFileName.slice(0, dotIndex);
        encryptedName = encryptedName.replace(/-/g, '+').replace(/_/g, '/');

        while (encryptedName.length % 4) {
            encryptedName += '=';
        }

        var binaryString = base64Decode(encryptedName);

        var decryptedName = '';
        for (var k = 0; k < binaryString.length; k++) {
            var charCode = binaryString.charCodeAt(k);
            var keyChar = KEY.charCodeAt(k % KEY.length);
            decryptedName += String.fromCharCode(charCode ^ keyChar);
        }

        return baseUrl + decryptedName + '.' + extension;

    } catch (e) {
        return urlInput;
    }
}
