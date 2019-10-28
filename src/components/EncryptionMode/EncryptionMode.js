import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import hack from "../../images/hack.png";
import { decryption, encryption } from "../../services/crypto-service";

const EncryptionMode = ({ imageRef }) => (
    <Container>
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Text</Form.Label>
                <Form.Control as="textarea" />
            </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>Encryption key</Form.Label>
                <Form.Control type="text" placeholder="Enter encryption key" />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Steganography key</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter steganography key"
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
                    decryption(encryption("some text", "s0m3k3y"), "s0m3k3y")
                }
            >
                <img src={hack} className={"w-100"} alt={"hack"} />
            </Col>
            <Col xs={5}></Col>
        </Row>
        <Row>
            <Col xs={10}>
                <Form.Group>
                    <Form.Label>Save path</Form.Label>
                    <Form.Control type="text" placeholder="Enter save path" />
                </Form.Group>
            </Col>
            <Col
                xs={2}
                className={"d-flex align-items-center cursor-on-hover w-100"}
            >
                <Button>Save</Button>
            </Col>
        </Row>
    </Container>
);

export default EncryptionMode;
