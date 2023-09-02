var idInput = document.getElementById("userId");
var passInput = document.getElementById("passCode");

function goLogin() {
    var userId = idInput.value;
    var passCode = passInput.value;
    var key1 = "Enjoy Life Forever";
    var key2 = "JW Library";
    var key3 = "Always Rejoice";

    var uiEncrypt = "U2FsdGVkX1+GKSK5uTHpRiqxHqygG6/j3wJtCONnArQ=";
    var uiDecrypt = CryptoJS.AES.decrypt(uiEncrypt, key1);
    var uiTest = uiDecrypt.toString(CryptoJS.enc.Utf8);
    if (userId == uiTest) {
        var passEncrypt = "U2FsdGVkX19Kt+VmJvNAtXZZwtc3fotoiKoqstFGWts=";
        var passDecrypt = CryptoJS.AES.decrypt(passEncrypt, key2);
        var passTest = passDecrypt.toString(CryptoJS.enc.Utf8);
        if (passCode == passTest) {
            var urlEncrypt = "U2FsdGVkX19Z+qAh9PpjvvXo/1dxk3WgbVI1bBQSu9I=";
            var urlDecrypt = CryptoJS.AES.decrypt(urlEncrypt, key3);
            var newUrl = urlDecrypt.toString(CryptoJS.enc.Utf8);
            window.location.replace(newUrl);
            // var winFeature = 'location=0,titlebar=0,toolbar=0,menubar=0'; 
            window. open(newUrl,'null',winFeature);
        } else {
            alert("Incorrect passcode. Please enter the correct passcode.")
        }
    } else {
        alert("Unknown User ID. Please enter a valid ID");
    }
}
