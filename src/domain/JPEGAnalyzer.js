import { bmpToJpgToBmp } from "../services/converter-service";
import { readFile, writeToFile } from "../services/file-service";
import { START_POINT } from "../services/crypto-service";
import Jimp from "jimp";

export class JPEGAnalyzer {
    constructor(path) {
        bmpToJpgToBmp(path, (bmpBefore, bmpAfter) => {
            this.beforeByteArr = bmpBefore;
            this.afterByteArr = bmpAfter;
            this.compare();
        });
    }

    compare() {
        this.changedBytes = [];
        for (let i = START_POINT; i < this.beforeByteArr.length; i++) {
            if (Math.abs(this.beforeByteArr[i] - this.afterByteArr[i]) > 2) {
                this.changedBytes.push(i);
            }
        }
        for (let i = 0; i < this.changedBytes.length; i++) {
            let co = this.changedBytes[i] % 3;
            switch (co) {
                case 0:
                    this.beforeByteArr[this.changedBytes[i]] = 0;
                    this.beforeByteArr[this.changedBytes[i] + 1] = 0;
                    this.beforeByteArr[this.changedBytes[i] + 2] = 255;
                    break;
                case 1:
                    this.beforeByteArr[this.changedBytes[i] - 1] = 0;
                    this.beforeByteArr[this.changedBytes[i]] = 0;
                    this.beforeByteArr[this.changedBytes[i] + 1] = 255;
                    break;
                case 2:
                    this.beforeByteArr[this.changedBytes[i] - 2] = 0;
                    this.beforeByteArr[this.changedBytes[i] - 1] = 0;
                    this.beforeByteArr[this.changedBytes[i]] = 255;
                    break;
            }
        }
        console.log(this.afterByteArr.length);
        console.log(this.beforeByteArr.length);
        console.log(this.changedBytes.length);
        writeToFile("./test.bmp", this.beforeByteArr, () => {}, console.error);
    }

    getChangedBytesList() {
        return this.changedBytes;
    }

    getChangedBytesSize() {
        return this.changedBytes.length;
    }
}
