import { toBase64 } from "./coding-service";

const fs = window.require("fs");

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
