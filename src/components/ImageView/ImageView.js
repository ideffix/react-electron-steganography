import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import React, { useState } from "react";
import EncryptionMode from "../EncryptionMode";
import DecryptionMode from "../DecryptionMode";
import NoiseMode from "../NoiseMode";

const ImageView = ({ imageRef }) => {
    const [mode, setMode] = useState("encryption");

    return (
        <div>
            <div className="d-flex justify-content-center">
                <ToggleButtonGroup
                    type="radio"
                    name="radio"
                    value={mode}
                    onChange={setMode}
                >
                    <ToggleButton
                        type="radio"
                        name="radio"
                        value={"encryption"}
                    >
                        Encryption
                    </ToggleButton>
                    <ToggleButton
                        type="radio"
                        name="radio"
                        value={"decryption"}
                    >
                        Decryption
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value={"noise"}>
                        Noise
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {mode === "encryption" && (
                    <EncryptionMode imageRef={imageRef} />
                )}
                {mode === "decryption" && (
                    <DecryptionMode imageRef={imageRef} />
                )}
                {mode === "noise" && <NoiseMode imageRef={imageRef} />}
            </div>
        </div>
    );
};

export default ImageView;
