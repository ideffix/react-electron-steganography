import { sha512, sha512_256 } from "js-sha512";
import aesjs from "aes-js";
import { readFile } from "./file-service";
import * as _ from "lodash";
import seedrandom from "seedrandom";

const LENGTH_OF_LENGTH_BYTES = 4;
export const START_POINT = 200;
const EXCESS_ONE_CODE = "11010";
const EXCESS_ZERO_CODE = "00101";
const EXCESS_BIT_SIZE = 5;

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

export const hideIntoImg = (path, byteArr, steganographyKey, onDataHide) => {
    const seed = sha512.array(steganographyKey);
    readFile(
        path,
        imgData => {
            const gen = uniqueRandomInRange(seed, START_POINT, imgData.length);
            writeData(
                imgData,
                gen,
                getInt64Bytes(byteArr.length).slice(LENGTH_OF_LENGTH_BYTES)
            );
            writeData(imgData, gen, byteArr);
            onDataHide(imgData);
        },
        console.error
    );
};

export const readFromImage = (path, steganographyKey, onDataRead) => {
    const seed = sha512.array(steganographyKey);
    readFile(
        path,
        imgData => {
            const gen = uniqueRandomInRange(seed, START_POINT, imgData.length);
            const buffer = readData(imgData, gen, LENGTH_OF_LENGTH_BYTES);
            const length = intFromBytes(buffer);
            onDataRead(readData(imgData, gen, length));
        },
        console.error
    );
};

const readData = (imgData, gen, length) => {
    const buffer = [];
    let excessByte = "";
    while (true) {
        excessByte += read2Bites(imgData, gen);
        if (excessByte.length === 8 * EXCESS_BIT_SIZE) {
            buffer.push(parseInt(readExcessByte(excessByte), 2));
            excessByte = "";
        }
        if (buffer.length >= length) {
            return buffer;
        }
    }
};

const read2Bites = (imgData, gen) => {
    const a1 = imgData[gen.next().value] % 2;
    const a2 = imgData[gen.next().value] % 2;
    const a3 = imgData[gen.next().value] % 2;
    return String(xor(a1, a3)) + String(xor(a2, a3));
};

const readExcessByte = excessByte =>
    _.chunk(excessByte, EXCESS_BIT_SIZE)
        .map(readExcessBit)
        .join("");

const readExcessBit = excessBit => {
    let match = 0;
    for (let i = 0; i < EXCESS_BIT_SIZE; i++) {
        if (excessBit[i] === EXCESS_ONE_CODE[i]) {
            match++;
        }
    }
    return match > EXCESS_BIT_SIZE / 2 ? "1" : "0";
};

const writeData = (imgData, gen, data) => {
    for (let i = 0; i < data.length; i++) {
        const bits = excessBits(decToBin(data[i]));
        for (let j = 0; j < bits.length; j += 2) {
            write2Bits(imgData, gen, Number(bits[j]), Number(bits[j + 1]));
        }
    }
};

const excessBits = bits =>
    [...bits]
        .map(b => (b === "1" ? EXCESS_ONE_CODE : EXCESS_ZERO_CODE))
        .join("");

const write2Bits = (imgData, gen, x1, x2) => {
    const i1 = gen.next().value;
    const i2 = gen.next().value;
    const i3 = gen.next().value;
    const a1 = imgData[i1] % 2;
    const a2 = imgData[i2] % 2;
    const a3 = imgData[i3] % 2;
    if (xor(a1, a3) !== x1) {
        if (xor(a2, a3) === x2) {
            imgData[i1] = imgData[i1] + resolveChange(a1);
        } else {
            imgData[i3] = imgData[i3] + resolveChange(a3);
        }
    } else if (xor(a2, a3) !== x2) {
        imgData[i2] = imgData[i2] + resolveChange(a2);
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

export function* uniqueRandomInRange(seed, from, to) {
    const usedIndexes = [];
    const rand = seedrandom(seed);
    while (true) {
        const index = Math.round(rand() * (to - from) + from);
        if (usedIndexes.includes(index)) {
            continue;
        } else {
            usedIndexes.push(index);
            yield index;
        }
    }
}
