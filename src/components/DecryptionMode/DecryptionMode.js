import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import hack from "../../images/hack.png";
import { decryption, readFromImage } from "../../services/crypto-service";

const DecryptionMode = ({ imageRef }) => {
    const [form, setValues] = useState({});
    const [decryptedMessage, setDecryptedMessage] = useState("");
    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Container>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Decryption key</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter decryption key"
                        onChange={updateField}
                        name={"decryptionKey"}
                    />
                </Form.Group>
            </Form.Row>
            <Row>
                <Col xs={10}>
                    <img
                        src={imageRef.path}
                        className={"w-100"}
                        alt={"encoded-img"}
                    />
                </Col>
                <Col
                    xs={2}
                    className={"d-flex align-items-center cursor-on-hover"}
                    onClick={() =>
                        readFromImage(imageRef.path, byteArr =>
                            setDecryptedMessage(
                                decryption(byteArr, form.decryptionKey)
                            )
                        )
                    }
                >
                    <img src={hack} className={"w-100"} alt={"hack"} />
                </Col>
            </Row>
            {decryptedMessage}
        </Container>
    );
};

export default DecryptionMode;
