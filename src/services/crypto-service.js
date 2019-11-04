import { sha512_256 } from "js-sha512";
import aesjs from "aes-js";
import { readFile } from "./file-service";

const LENGTH_OF_LENGTH_BYTES = 4;
const START_POINT = 200;

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

export const hideIntoImg = (imageRef, byteArr, onDataHide) => {
    readFile(
        imageRef.path,
        imgData => {
            const offset = writeData(
                imgData,
                START_POINT,
                getInt64Bytes(byteArr.length).slice(LENGTH_OF_LENGTH_BYTES)
            );
            writeData(imgData, offset, byteArr);
            onDataHide(imgData);
        },
        console.error
    );
};

const writeData = (imgData, offset, data) => {
    for (let i = 0; i < data.length; i++) {
        const bits = decToBin(data[i]);
        for (let j = 0; j < bits.length; j += 2) {
            write2Bits(imgData, offset, Number(bits[j]), Number(bits[j + 1]));
            offset += 3;
        }
    }
    return offset;
};

const write2Bits = (imgData, offset, x1, x2) => {
    const a1 = imgData[offset] % 2;
    const a2 = imgData[offset + 1] % 2;
    const a3 = imgData[offset + 2] % 2;
    if (xor(a1, a3) !== x1) {
        if (xor(a2, a3) === x2) {
            imgData[offset] = imgData[offset] + resolveChange(a1);
        } else {
            imgData[offset + 2] = imgData[offset + 2] + resolveChange(a3);
        }
    } else if (xor(a2, a3) !== x2) {
        imgData[offset + 1] = imgData[offset + 1] + resolveChange(a2);
    }
};

const resolveChange = a => (a === 0 ? 1 : -1);

const xor = (a, b) => (a === b ? 0 : 1);

const intFromBytes = x => {
    let val = 0;
    for (let i = 0; i < x.length; ++i) {
        val += x[i];
        if (i < x.length - 1) {
            val = val << 8;
        }
    }
    return val;
};

const getInt64Bytes = x => {
    let bytes = [];
    let i = 8;
    do {
        bytes[--i] = x & 255;
        x = x >> 8;
    } while (i);
    return bytes;
};

const decToBin = dec => {
    const bin = dec.toString(2);
    return bin.padStart(8, "0");
};
