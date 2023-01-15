const express = require('express');
const crypto = require('crypto');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

// serve the file upload form
app.get('/', (req, res) => {
  res.send(`<style>html {
  font-family: 'Courier New', monospace;
  text-align: center;
  color: white;
  background-color: #333;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"], input[type="file"], button {
  font-family: 'Courier New', monospace;
  color: white;
  background-color: #444;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

input[type="text"]:focus, input[type="file"]:focus {
  outline: none;
  box-shadow: 0 0 10px white;
}

button:hover {
  cursor: pointer;
  background-color: #555;
}
</style>
    <a href="/en"><h1 style="font-family: 'Courier New', monospace;
  color: white;">Click For Encryption Page<h1></a>
    <form action="/decrypt" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <br />
      <input type="text" name="aesKey" placeholder="AES Key" />
      <br />
      <input type="fileS" name="fileS" style="font-family: 'Courier New', monospace;
  color: white;
  background-color: #444;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;" placeholder="File Ext."/>
      <br />
      <button type="submit">Decrypt</button>
    </form>
  `);
});

app.get('/en', (req, res) => {
  res.send(`<style>html {
  font-family: 'Courier New', monospace;
  text-align: center;
  color: white;
  background-color: #333;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

input[type="text"], input[type="file"], button {
  font-family: 'Courier New', monospace;
  color: white;
  background-color: #444;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

input[type="text"]:focus, input[type="file"]:focus {
  outline: none;
  box-shadow: 0 0 10px white;
}

button:hover {
  cursor: pointer;
  background-color: #555;
}
</style>
    <a href="./"><h1 style="font-family: 'Courier New', monospace;
  color: white;">Click For Decryption Page<h1></a>
    <form action="/encrypt" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <br />
      <input type="text" name="aesKey" placeholder="AES Key" />
      <br />
      <button type="submit">Encrypt</button>
    </form>
  `);
});

// handle the file upload and encryption
app.post('/encrypt', upload.single('file'), (req, res) => {
  // get the file and the aes key from the request
  const file = req.file;
  const aesKey = req.body.aesKey;

  // convert the file to a base64 string
  const fileAsBase64 = file.buffer.toString('base64');

  // create a cipher object using the aes key
  const cipher = crypto.createCipher('aes-256-cbc', aesKey);

  // encrypt the file and convert it to a hexadecimal string
  let encrypted = cipher.update(fileAsBase64, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // prompt the user to download the encrypted file
  res.setHeader('Content-disposition', 'attachment; filename=encrypted.txt');
  res.setHeader('Content-type', 'text/plain');
  res.send(encrypted);
});
// handle the file upload and decryption
// handle the file upload and decryption
app.post('/decrypt', upload.single('file'), (req, res) => {
  // get the file and the aes key from the request
  const file = req.file;
  const aesKey = req.body.aesKey;
  const ext = req.body.fileS;

  // get the encrypted file contents as a hexadecimal string
  const encrypted = file.buffer.toString('utf8');

  // create a decipher object using the aes key
  const decipher = crypto.createDecipher('aes-256-cbc', aesKey);

  // decrypt the file and convert it from a hexadecimal string to a base64 string
  let decrypted = decipher.update(encrypted, 'hex', 'base64');
  decrypted += decipher.final('base64');

  // decode the file from base64 twice to get the original plain text
  const decoded1 = Buffer.from(decrypted, 'base64').toString('utf8');
  const decoded2 = Buffer.from(decoded1, 'base64')

  // prompt the user to download the decrypted file as a text file
  res.setHeader('Content-disposition', 'attachment; filename=decrypted.' + ext);
  res.send(Buffer.from(decoded2, 'binary'));
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
