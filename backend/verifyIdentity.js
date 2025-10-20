const crypto=require('crypto');
const fs=require('fs');
const decrypt=require('./cryptography/decrypt');

const receivedData=require('./signMessage').packgeOfDataToSend;

const hash=crypto.createHash(receivedData.algorithm);

const publicKey=fs.readFileSync(__dirname+'/id_rsa_pub.pem','utf8');

const decryptedMessage=decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncrpytedData);

const decryptedMessageHex=decryptedMessage.toString();

const hashOfOrignal=hash.update(JSON.stringify(receivedData.originalData));

const hashOfOrignalHex=hash.digest('hex');

if(hashOfOrignalHex===decryptedMessageHex){
    console.log('Success!!');
}else{
    console.log('Bruh!!')
}