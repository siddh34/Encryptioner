import "./App.css";
import React, { useState } from "react";
import { AES } from "crypto-js";
import { JSEncrypt } from "jsencrypt";
import forge from "node-forge";
import CryptoJS from 'crypto-js';

function App() {
  let [text, setText] = useState("");

  let [myKey, setMyKey] = useState("");

  let [myiv , setMyIV] = useState("");   

  let [myencrytedText , setMyencrytedText] = useState("");  
  
  let [myPublicKey, setmyPublicKey] = useState("");

  let [myPrivateKey, setmyPrivateKey] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  let encrypt = (event) => {
    let dropdown = document.getElementById("cat");

    event.preventDefault();

    if (dropdown.selectedIndex === 1) {
      var message = text;

      var key = forge.random.getBytesSync(32);
      var iv = forge.random.getBytesSync(16);

      setMyIV(iv);

      setMyKey(key);

      const encryptedMessage = AES.encrypt(message, key, { iv }).toString();

      setMyencrytedText(encryptedMessage);

      document.getElementById("Encrypted Message").innerHTML = encryptedMessage;
    } else if (dropdown.selectedIndex === 2) {
      var encrypt = new JSEncrypt();

      const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
      const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
      const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);

      setmyPublicKey(publicKey);
      setmyPrivateKey(privateKey);

      encrypt.setPublicKey(publicKey);

      var encrypted = encrypt.encrypt(text);

      setMyencrytedText(encrypted);

      document.getElementById("Encrypted Message").innerHTML = encrypted;
    } else if (dropdown.selectedIndex === 3) {
      let key = forge.random.getBytesSync(8);
      let iv = forge.random.getBytesSync(8);

      setMyIV(forge.util.bytesToHex(iv));

      setMyKey(forge.util.bytesToHex(key));

      var cipher = forge.cipher.createCipher("DES-CBC", key);
      cipher.start({ iv: iv });
      cipher.update(forge.util.createBuffer(text));
      cipher.finish();

      // Get the ciphertext as a hex string
      let encrypted = forge.util.bytesToHex(cipher.output.getBytes());

      setMyencrytedText(encrypted)

      document.getElementById("Encrypted Message").innerHTML = encrypted;
    }
  };

  let decrypt = (event) => {
    let dropdown = document.getElementById("cat");

    event.preventDefault();

    if (dropdown.selectedIndex === 1) {
      const decryptedBytes = CryptoJS.AES.decrypt(myencrytedText, myKey, { myiv });
      const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

      document.getElementById("decrypted Message").innerHTML = decryptedMessage;
    }
    else if(dropdown.selectedIndex === 2){
      var decrypt = new JSEncrypt();

      decrypt.setPrivateKey(myPrivateKey);

      var decrypted = decrypt.decrypt(myencrytedText);

      document.getElementById("decrypted Message").innerHTML = decrypted;
    }
    else if(dropdown.selectedIndex === 3){
      // Convert the encryption key from hex string to binary
      const keyBytes = forge.util.hexToBytes(myKey);
      const ivBytes = forge.util.hexToBytes(myiv);
      // const ivHex = forge.util.bytesToHex(iv);
      
      // Create a decipher object with the DES algorithm and CBC mode
      const decipher = forge.cipher.createDecipher('DES-CBC', keyBytes);
      decipher.start({ iv: ivBytes });
      
      // Convert the encrypted message from hex string to binary
      const encryptedBytes = forge.util.hexToBytes(myencrytedText);
      
      // Decrypt the message
      decipher.update(forge.util.createBuffer(encryptedBytes));
      decipher.finish();
      
      // Get the decrypted bytes
      const decryptedBytes = decipher.output.getBytes();
      
      // Convert the decrypted bytes to a string
      const decryptedMessage = forge.util.decodeUtf8(decryptedBytes);

      document.getElementById("decrypted Message").innerHTML = decryptedMessage;
    }
  };


  return (
    <>
      <body>
        <form>
          <div className="main">
            <div className="encrypt">
              <h1>ENCRPTION</h1>
              <br></br>
              <textarea
                rows="7"
                columns="7"
                placeholder="Enter text here"
                style={{ backgroundColor: "black" }}
                color="white"
                onChange={handleChange}
              ></textarea>
              <br></br>
              <span style={{ color: "aliceblue" }}>
                <strong>SELECT TECHNIQUE</strong>
              </span>
              <br></br>
              <div className="tech">
                <div className="custom-select">
                  <select id="cat" >
                    <option value="0">Encrypt using</option>
                    <option value="1">AES</option>
                    <option value="2">RSA</option>
                    <option value="3">DES</option>
                  </select>
                </div>
              </div>
              <input type="submit" className="sb" onClick={encrypt}></input>
              <br></br>
              <p id="Encrypted Message" style={{color:"white"}}></p>
            </div>
            <div className="decrypt">
              <h1>DECRYPTION</h1>
              <br></br>
              <textarea rows="7" columns="7" placeholder="Enter text here" style={{backgroundColor: "black"}} ></textarea><br></br>
              {/* <span style={{color: 'aliceblue'}}><strong>SELECT TECHNIQUE</strong></span><br></br> */}
              <input type="submit" className="sb" onClick={decrypt}></input>
              <br></br>
              <p id="decrypted Message" style={{color:"white"}}></p>
            </div>
          </div>
        </form>
      </body>
    </>
  );
}

export default App;
