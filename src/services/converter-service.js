import Jimp from "jimp";

export const bmpToJpgToBmp = (path, cb) => {
    Jimp.read(path).then(bmp => {
        bmp.getBuffer(Jimp.MIME_JPEG, (err, buffer) =>
            Jimp.read(buffer).then(jpg =>
                jpg.getBuffer(Jimp.MIME_BMP, (err1, bmp2) =>
                    bmp.getBuffer(Jimp.MIME_BMP, (err2, bmp1) => cb(bmp1, bmp2))
                )
            )
        );
    });
};
