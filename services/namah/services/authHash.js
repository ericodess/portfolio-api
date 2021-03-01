const crypto = require('crypto');

const authHash = async (toBeChecked, generatedHash) => {
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

module.exports = authHash;