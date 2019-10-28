export const toBase64 = u8 => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8.length;
    let result = "";
    let slice;
    while (index < length) {
        slice = u8.subarray(index, Math.min(index + CHUNK_SIZE, length));
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return btoa(result);
};
