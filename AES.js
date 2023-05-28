const fs = require("fs");
const crypto = require('crypto');
// import NodeRSA from 'node-rsa';


function AESEncrypt(message){
    // Define the message to be encrypted
    var message = message;
    
    // Generate a 256-bit key and 128-bit initialization vector
    const key = crypto.randomBytes(32); // 256-bit key
    const iv = crypto.randomBytes(16); // 128-bit IV
    
    // Encrypt the message using AES-256-CBC
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(message, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    console.log('Encrypted message:', encrypted);
    
    // Write the ciphertext to a file
    fs.writeFile("ciphertext.txt", encrypted, (err) => {
        if (err) throw err;
        console.log("Ciphertext written to file.");
    });

    fs.writeFile("key.txt", key, (err) => {
        if (err) throw err;
        console.log("key written to file.");
    });

    fs.writeFile("iv.txt", key, (err) => {
        if (err) throw err;
        console.log("iv written to file.");
    });
}

AESEncrypt("Hey");

// AESDecrypt();

function AESDecrypt() {
    // Decrypt the message using AES-256-CBC
    // let key = localStorage.getItem("AESKEY");
    // let iv = localStorage.getItem("AESIV");
    // let encrypted = localStorage.getItem("AESCiphertext");
    let encrypted = fs.readFile("./ciphertext.txt",(err, data) => {
        if (err) throw err;
        console.log(data);
    });
    let key = fs.readFile("./key.txt",(err, data) => {
        if (err) throw err;
        console.log(data);
    });
    let iv = fs.readFile("./iv.txt",(err, data) => {
        if (err) throw err;
        console.log(data);
    });
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    console.log('Decrypted message:', decrypted);
    localStorage.store(decrypted);
}