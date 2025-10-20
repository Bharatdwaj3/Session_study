const fs=require('fs');
const encrypt=require('./encrypt');
const decrypt=require('./decrypt');

const publicKey=fs.readFileSync(__dirname+'/id_rsa_pub.pem','utf8');
const encryptedMessage=encrypt.encryptWithPublicKey(publicKey, 'Super secrect message');


console.log(encryptedMessage.toString());

const privateKey=fs.readFileSync(__dirname+'/id_rsa_priv_pem','utf8');
const decrpytedMessage=decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decrpytedMessage.toString());