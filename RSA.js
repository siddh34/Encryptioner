// import CryptoJS from 'crypto-js';

const CryptoJS = require('crypto-js');

function RSA(message){
    const crypto = require('crypto');

    // Generate a new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    
    // Define the message to be encrypted
    var message = message;
    
    // Encrypt the message using the public key
    const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
    console.log('Encrypted message:', encrypted.toString('base64'));
    
    // Decrypt the message using the private key
    const decrypted = crypto.privateDecrypt(privateKey, encrypted);
    console.log('Decrypted message:', decrypted.toString());
}