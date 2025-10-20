const cryto=require('crypto');


function validatePassword(password, hash, salt){
    var genHash=cryto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify; 
}


function genPassword(password){
    var salt=cryto.randomBytes(32).toString('hex');
    var genHash=cryto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };

}
module.exports={
    genPassword, validatePassword, issueJWT
};