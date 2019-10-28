import { sha512_256 } from "js-sha512";
import aesjs from "aes-js";

export const encryption = (text, key) => {
    const keyArray = sha512_256.array(key);
    const textBytes = aesjs.utils.utf8.toBytes(text);
    const aesCtr = new aesjs.ModeOfOperation.ctr(keyArray);
    return aesCtr.encrypt(textBytes);
};

export const decryption = (byteArr, key) => {
    const keyArray = sha512_256.array(key);
    const aesCtr = new aesjs.ModeOfOperation.ctr(keyArray);
    const decryptedBytes = aesCtr.decrypt(byteArr);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
};
