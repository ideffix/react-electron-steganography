import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import hack from "../../images/hack.png";

const DecryptionMode = ({ imageRef }) => (
    <Container>
        <Row>
            <Col xs={10}>
                <img
                    src={imageRef.path}
                    className={"w-100"}
                    alt={"encoded-img"}
                />
            </Col>
            <Col xs={2} className={"d-flex align-items-center cursor-on-hover"}>
                <img src={hack} className={"w-100"} alt={"hack"} />
            </Col>
        </Row>
    </Container>
);

export default DecryptionMode;
