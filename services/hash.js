const crypto = require('crypto');

const generateHash = async (toBeHashed) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.scrypt(`${process.env.SECRET[0]}${process.env.SECRET[process.env.SECRET.length - 1]}${toBeHashed}${process.env.SECRET}`, salt, 64, (error, derivedKey) => {
            if(error){
                reject(error);
            }else{
                resolve(`${salt}:${derivedKey.toString('hex')}`);
            }
        });
    })
};

exports.generateHash = generateHash;

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

exports.authHash = authHash;