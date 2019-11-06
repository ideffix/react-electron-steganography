import { toBase64 } from "./coding-service";

let fs;

try {
    fs = window.require("fs");
} catch (err) {
    fs = require("fs");
}

export const readFile = (path, cb, errCb) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            errCb(err);
        } else {
            cb(data);
        }
    });
};

export const readFileAsBase64 = (path, cb, errCb) => {
    readFile(
        path,
        data => {
            cb(toBase64(data));
        },
        errCb
    );
};

export const writeToFile = (path, byteArr, cb, errorCb) => {
    fs.writeFile(path, byteArr, err => {
        if (err) {
            errorCb();
        } else {
            cb();
        }
    });
};
