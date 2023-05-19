const crypto = require('crypto');

const iv = Buffer.alloc(16); // zeroed-out iv
const key = 'abcd'
const algorithm = 'aes-128-cbc';

export function encryptPassword(password: string){
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return { hash, salt }
}

export function verifyPassword({password, salt, hash}:{password: string, salt: string, hash: string}){
    const hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hashPassword === hash;
}