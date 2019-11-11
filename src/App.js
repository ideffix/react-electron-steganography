import React, { useState } from "react";
import DragAndDrop from "./components/DragAndDrop";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tab, Tabs } from "react-bootstrap";
import { v4 } from "uuid";
import ImageView from "./components/ImageView";

const App = () => {
    const [imagesRefs, setImagesRefs] = useState([]);
    const [key, setKey] = useState("d&d");
    const onDropHandle = files => {
        setImagesRefs(
            imagesRefs.concat(
                files.map(f => {
                    f.uuid = v4();
                    return f;
                })
            )
        );
    };
    return (
        <Tabs id={"tabs"} activeKey={key} onSelect={setKey}>
            <Tab title={"Add photo"} eventKey={"d&d"}>
                <DragAndDrop onDrop={onDropHandle} />
            </Tab>
            {imagesRefs.map(im => (
                <Tab title={im.name} eventKey={im.uuid} key={im.uuid}>
                    <ImageView imageRef={im} />
                </Tab>
            ))}
        </Tabs>
    );
};

export default App;
