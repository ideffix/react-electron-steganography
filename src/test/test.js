import {
    decryption,
    encryption,
    hideIntoImg,
    readFromImage
} from "../services/crypto-service";
import { writeToFile } from "../services/file-service";

const TEXT = "Message";
const KEY = "Kluczyk";
const TESTED_IMG_PATH = "./../images/test.bmp";
const CREATED_IMG_PATH = "./test2.bmp";

hideIntoImg(TESTED_IMG_PATH, encryption(TEXT, KEY), data => {
    writeToFile(
        CREATED_IMG_PATH,
        data,
        () => {
            readFromImage(CREATED_IMG_PATH, readData =>
                console.log(decryption(readData, KEY))
            );
        },
        console.log
    );
});
