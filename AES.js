

function AES(message){
    const crypto = require('crypto');

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
    
    // Decrypt the message using AES-256-CBC
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    console.log('Decrypted message:', decrypted);
}