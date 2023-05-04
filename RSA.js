import CryptoJS from 'crypto-js';

// RSA

function RSA(message){
    var keySize = 2048;
    var keyPair = CryptoJS.lib.SerializableCipher.generateKeyPair({bits: keySize});

    // Get the public key as a string
    var publicKey = keyPair.publicKey.toString();

    // Get the private key as a string
    var privateKey = keyPair.privateKey.toString();

    // Encrypt a message using the public key
    var message = message;
    var encrypted = CryptoJS.AES.encrypt(message, publicKey);

    // Decrypt the message using the private key
    var decrypted = CryptoJS.AES.decrypt(encrypted, privateKey);
    var plaintext = decrypted.toString(CryptoJS.enc.Utf8);

    console.log("Original message: " + message);
    console.log("Encrypted message: " + encrypted);
    console.log("Decrypted message: " + plaintext);
}

RSA("Hello, world!");