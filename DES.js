// Load crypto-js library
const CryptoJS = require("crypto-js");

// Set the key and plaintext
const key = "mysecretkey";
const plaintext = "This is a secret message.";

// Encrypt the plaintext
const ciphertext = CryptoJS.DES.encrypt(plaintext, key).toString();

// Write the ciphertext to a file
fs.writeFile("ciphertext.txt", ciphertext, (err) => {
  if (err) throw err;
  console.log("Ciphertext written to file.");
});

// Decrypt the ciphertext
const decrypted = CryptoJS.DES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);

// Print the decrypted plaintext
console.log("Decrypted plaintext:", decrypted);
