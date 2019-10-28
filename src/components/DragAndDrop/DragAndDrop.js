import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DragAndDrop = ({ onDropHandler }) => {
    const onDrop = useCallback(onDropHandler, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/bmp"
    });

    return (
        <div className={"dnd-parent"}>
            <div
                {...getRootProps()}
                className={"drag-and-drop" + (isDragActive ? " dragging" : "")}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <h1>Drop the files here ...</h1>
                ) : (
                    <h1>
                        Drag 'n' drop some files here, or click to select files
                    </h1>
                )}
            </div>
        </div>
    );
};

export default DragAndDrop;
