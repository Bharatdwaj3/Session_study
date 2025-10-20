const crypto=require('crypto');
const hash=crypto.createHash('sha256');
const fs=require('fs');

const encrypt=require('./encrypt');
const decrypt=require('./decrypt');

const myData={
    firstName: 'Zach',
    lastName: 'Gollwitzer',
    socialSecurityNumber: 'Nein Nein no personal details!'
};

const myDataString = JSON.stringify(myData);

hash.update(myDataString);
const hashedData=hash.digest('hex');

const senderPrivateKey=fs.readFileSync(__dirname + '/id_rsa_priv_pem','utf-8');
const signedMessage=encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

const packgeOfDataToSend={
    algorithm: 'sha256',
    originalData:myData,
    signedAndEncrpytedData: signedMessage
};

module.exports.packgeOfDataToSend=packgeOfDataToSend;
