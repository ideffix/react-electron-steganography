import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { JPEGAnalyzer } from "../../domain/JPEGAnalyzer";
import { toBase64 } from "../../services/coding-service";

const NoiseMode = ({ imageRef }) => {
    const [b64Img, setB64Img] = useState("");
    useEffect(() => {
        new JPEGAnalyzer(imageRef.path).init(anal =>
            setB64Img(toBase64(Buffer.from(anal.markedNoiseByteArr)))
        );
    }, []);
    return (
        <Container>
            <img
                src={"data:image/bmp;base64," + b64Img}
                className={"w-100"}
                alt={"encoded-img"}
            />
        </Container>
    );
};

export default NoiseMode;
