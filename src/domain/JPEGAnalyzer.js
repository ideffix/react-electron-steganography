import { bmpToJpgToBmp } from "../services/converter-service";
import { readFile, writeToFile } from "../services/file-service";
import { START_POINT } from "../services/crypto-service";
import Jimp from "jimp";

export class JPEGAnalyzer {
    constructor(path) {
        this.path = path;
    }

    init(cb) {
        bmpToJpgToBmp(this.path, (bmpBefore, bmpAfter) => {
            this.beforeByteArr = bmpBefore;
            this.afterByteArr = bmpAfter;
            this.compare();
            cb(this);
        });
    }

    compare() {
        this.changedBytes = [];
        for (let i = START_POINT; i < this.beforeByteArr.length; i++) {
            if (this.beforeByteArr[i] !== this.afterByteArr[i]) {
                this.changedBytes.push(i);
            }
        }
        this.markNoise();
    }

    markNoise() {
        this.markedNoiseByteArr = [...this.beforeByteArr];
        for (let i = 0; i < this.changedBytes.length; i++) {
            let co = this.changedBytes[i] % 3;
            switch (co) {
                case 0:
                    this.markedNoiseByteArr[this.changedBytes[i]] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i] + 1] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i] + 2] = 255;
                    break;
                case 1:
                    this.markedNoiseByteArr[this.changedBytes[i] - 1] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i]] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i] + 1] = 255;
                    break;
                case 2:
                    this.markedNoiseByteArr[this.changedBytes[i] - 2] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i] - 1] = 0;
                    this.markedNoiseByteArr[this.changedBytes[i]] = 255;
                    break;
            }
        }
    }

    getChangedBytesList() {
        return this.changedBytes;
    }

    getChangedBytesSize() {
        return this.changedBytes.length;
    }
}
