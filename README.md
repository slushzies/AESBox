# AESBox
A simple node.js script to run a website that can encrypt and decrypt files, specialized for .ZIP files.
/en is the route for encryption.

You can't use FTP on a mobile device, so the only option to transfer files is pretty much to upload to Google Drive or other cloud based providers.
When you upload files to a cloud-based service, you are essentially giving that company access to your data. This can be a concern if you have sensitive or personal information in the files you are uploading. The company that operates the cloud service may have access to your data and could potentially use it in ways you are not aware of or that you do not consent to. Additionally, if the cloud service is hacked or if there is a data leak, your data could be accessed by unauthorized parties.

This is why you should use AES box. You can upload all your personal files to a zip and use a very secure key. (USE HTTPS ALWAYS!!)
Email yourself or upload the encrypted file to a cloud based storage service, then download it on the device you wish to transfer it to.
Upload it back to AESBox and decrypt it with the key you remembered, or use your own AES decryption app.

To get going, run npm i, then node index.js! It should listen on port 3000. 
