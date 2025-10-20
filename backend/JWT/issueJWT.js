const base64url=require('base64url');
const crypto=require('crypto');
const signatureFuntion=crypto.createSign('RSA-SHA256');
const verifyfunction =crypto.createVerify('RSA-SHA256');
const fs=require('fs');


const headerObj={
    alg: 'RSA256',
    type: 'JWT'
};

const payloadObj={
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
};

const headerObjString=JSON.stringify(headerObj);
const payloadObjString=JSON.stringify(payloadObj);

const base64UrlHeader=base64url(headerObjString);
const base64urlPayload=base64url(payloadObjString);

signatureFuntion.write(base64UrlHeader+"."+base64urlPayload);
signatureFuntion.end();

const PRIV_KEY=fs.readFileSync(__dirname+'/rsa_priv.pem','utf8');
const signatureBase64=signatureFuntion.sign(PRIV_KEY,'base64');

const signatureBase64Url=base64url.fromBase64(signatureBase64);

console.log(signatureBase64Url);


const jwt = 'RBgXD_sNf4Yl3tc6c6WraMRqdAUYfPXrG-mabDmRIE8cOQ-Bukjaoc0959sEyTZAavFJKwVqztbC69niJ9tSomA7p3W2Zq1QZivF9N_2i7N4e-SjfndGgBxNIDeOopR-xDi5tN5aQVPslbTr2JI4GWFaD-bx9ahT5QNhlSWyJQsfy1JgVz77_w4gC0yTkQ-fKc31vDvSlGj37hPk4Ux09LIyArdw55UAeOv8lP6C7rVlGevVy-TsdJmGc0rh80FjxiEbomXhlKsm68Fmwr-6j1fDZk-WIf00z-wpOpX8_8k-DPMf0blgSjdckFXhHohTzorxOm5PdE4KKHKPAgaKebtBtFBHCjngQSdd5CFQB5f_RPEKC-lgzvSOmRxVr4-MganL9CiQuaFsPg4A3Q8ajrKQ7jvrk-3XMTHWJfRfuV3ZBg1tha1xTRg-79mS3UtR4Rwxo0tZKQFrayziwTRbd2p-EAwGcG7QV9l1LZHJOZ4yofIOzLZURL_XROmKB91trOfByHZCB9azy0Wtk6tA-1Lidq2M_vEMH0HHaCTiLPM944Jfau-RfZZe168A6j8fnBm6yCl3fk9bBSySmhOX6ilM1mjJmgBk-gN2Nh8XLlFpKMpkycAxvLOiErWvuG10B7z1YIhzPbaMS715mkdDA3C7VZbk7jktRO_NkAmY1lI'

const jwtParts=jwt.split('.');

const headerInBase64UrlFormat=jwtParts[0];
const payloadInBase64UrlFormat=jwtParts[0];
const signatureInBase64UrlFormat=jwtParts[0];

verifyfunction.write(headerInBase64UrlFormat+'.'+payloadInBase64UrlFormat);
verifyfunction.end();

const jwtSignatureBase64=base64url.toBase64(signatureInBase64UrlFormat);
 
const PUB_KEY=fs.readFileSync(__dirname+'./rsa_pub.pem','utf8');

const signatureIsValid=verifyfunction.verify(PUB_KEY, jwtSignatureBase64, 'base64');
console.log(signatureIsValid);