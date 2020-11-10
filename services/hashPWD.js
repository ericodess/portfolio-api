const crypto = require('crypto');

const genHash = async (toBeHashed) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.scrypt(toBeHashed , salt, 64, (error, derivedKey) => {
            if(error){
                reject(error);
            }else{
                resolve(`${salt}:${derivedKey.toString('hex')}`);
            }
        });
    })
};

exports.generateHash = genHash;

const chkHash = async (toBeChecked, generatedHash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = generatedHash.split(":")

        crypto.scrypt(toBeChecked, salt, 64, (error, derivedKey) => {
            if (error){
                reject(error);
            }else{
                resolve(key == derivedKey.toString('hex'));
            }
        });
    })
};

exports.checkHash = chkHash;