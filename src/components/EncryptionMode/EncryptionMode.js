import React, { useMemo, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import hack from "../../images/hack.png";
import { encryption, hideIntoImg } from "../../services/crypto-service";
import { toBase64 } from "../../services/coding-service";
import { writeToFile } from "../../services/file-service";

const EncryptionMode = ({ imageRef }) => {
    const [afterImage, setAfterImage] = useState(null);
    const [form, setValues] = useState({});
    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSaveClick = () =>
        writeToFile(form.savePath, afterImage, () =>
            console.log("Saved!", console.error())
        );
    const b64Img = useMemo(() => afterImage && toBase64(afterImage), [
        afterImage
    ]);
    return (
        <Container>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        onChange={updateField}
                        name={"text"}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Encryption key</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter encryption key"
                        onChange={updateField}
                        name={"encryptionKey"}
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Steganography key</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter steganography key"
                        onChange={updateField}
                        name={"steganographyKey"}
                    />
                </Form.Group>
            </Form.Row>
            <Row>
                <Col xs={5}>
                    <img
                        src={imageRef.path}
                        className={"w-100"}
                        alt={"before-img"}
                    />
                </Col>
                <Col
                    xs={2}
                    className={"d-flex align-items-center cursor-on-hover"}
                    onClick={() =>
                        hideIntoImg(
                            imageRef.path,
                            encryption(form.text, form.encryptionKey),
                            form.steganographyKey,
                            setAfterImage
                        )
                    }
                >
                    <img src={hack} className={"w-100"} alt={"hack"} />
                </Col>
                <Col xs={5}>
                    {afterImage && (
                        <img
                            src={"data:image/bmp;base64," + b64Img}
                            className={"w-100"}
                            alt={"after-img"}
                        />
                    )}
                </Col>
            </Row>
            <Row>
                <Col xs={10}>
                    <Form.Group>
                        <Form.Label>Save path</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter save path"
                            name={"savePath"}
                            onChange={updateField}
                        />
                    </Form.Group>
                </Col>
                <Col
                    xs={2}
                    className={
                        "d-flex align-items-center cursor-on-hover w-100"
                    }
                >
                    <Button onClick={handleSaveClick}>Save</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default EncryptionMode;
