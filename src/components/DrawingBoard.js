/**
 * © 2023 Amrutham Suresh Kumar. All rights reserved.
 This work is © 2023 Amrutham Suresh Kumar  and is licensed under MIT license.
 All code contained within this work is the property of Amrutham Suresh Kumar.
 Unauthorized copying, distribution or use of this code, whether in part or in whole, is strictly prohibited without express written permission from Amrutham Suresh Kumar.
 Any unauthorized use may result in legal action.
 */

import React, {useReducer, useRef, useState} from "react";
import {Ellipse, Image, Layer, Line, Rect, Stage, Text} from "react-konva";
import {Button, Col, ColorPicker, Dropdown, Input, Menu, Modal, Row, Space} from "antd";
import {CircleIcon, RectangleIcon, Download, Pencil, Redo, TextIcon, Undo, UploadIcon, LineIcon} from "../svg";

const initialState = {
    elements: [],
    undoStack: [],
    redoStack: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_ELEMENT":
            return {
                ...state,
                elements: [...state.elements, action.payload],
                undoStack: [...state.undoStack, state.elements],
                redoStack: [],
            };
        case "UNDO":
            if (state.undoStack.length === 0) {
                return state;
            }
            return {
                ...state,
                elements: state.undoStack[state.undoStack.length - 1],
                undoStack: state.undoStack.slice(0, -1),
                redoStack: [...state.redoStack, state.elements],
            };
        case "REDO":
            if (state.redoStack.length === 0) {
                return state;
            }
            return {
                ...state,
                elements: state.redoStack[state.redoStack.length - 1],
                undoStack: [...state.undoStack, state.elements],
                redoStack: state.redoStack.slice(0, -1),
            };
        default:
            return state;
    }
}

export default function DrawingBoard() {
    const [selectedTool, setSelectedTool] = useState(null);
    const [{elements, undoStack, redoStack}, dispatch] = useReducer(
        reducer,
        initialState
    );
    const [color, setColor] = useState("#000000");
    const [image, setImage] = useState(null);
    const stageRef = useRef(null);
    const layerRef = useRef();
    const [textInputModalVisible, setTextInputModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');

    const fontOptions = [
        "Arial",
        "Helvetica",
        "Times New Roman",
        "Courier New",
        "Verdana",
        "Georgia",
        "Comic Sans MS",
        "Impact",
        "Tahoma",
        "Lucida Console",
        "Open Sans",
        "Montserrat",
        "Roboto",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Mincho ProN",
        "Yu Gothic",
        "Meiryo UI",
        "MS PGothic",
        "MS PMincho",
    ];
    const fontSize = [
        18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,
        56,
    ];
    const [size, setSize] = useState(fontSize[0]);
    const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lines, setLines] = useState([]);

    const handleFileChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
            setImage(img);
        };
    };

    const handleDownload = () => {
        const url = layerRef.current.toCanvas();
        url.toBlob(async (blob) => {
            const link = document.createElement("a");
            link.download = `annotate_${new Date().getTime()}`;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
    };
    const handleMouseDown = () => {
        setIsDrawing(true);
        setLines([]);
    };

    const handleMouseMove = (event) => {
        if (!isDrawing) {
            return;
        }
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        setLines([...lines, point.x, point.y]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        if (selectedTool === "line") {
            const newLine = (
                <Line
                    points={[lines[0], lines[1], lines[lines.length - 2], lines[lines.length - 1]]}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "pen") {
            const newLine = (
                <Line
                    points={lines}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "circle") {
            const stage = stageRef.current;
            const point = stage.getPointerPosition();
            const finalLines = [...lines, point.x, point.y]

            const radiusX = (finalLines[finalLines.length - 2] - finalLines[0]) / 2;
            const radiusY = (finalLines[finalLines.length - 1] - finalLines[1]) / 2;

            const newCircle = (
                <Ellipse
                    x={finalLines[0] + radiusX}
                    y={finalLines[1] + radiusY}
                    radius={{
                        x: radiusX,
                        y: radiusY
                    }}
                    stroke={color}
                    strokeWidth={5}
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newCircle});
        } else if (selectedTool === "rectangle") {
            const stage = stageRef.current;
            const point = stage.getPointerPosition();
            const finalLines = [...lines, point.x, point.y]

            const newCircle = (
                <Rect
                    x={finalLines[0]}
                    y={finalLines[1]}
                    width={(finalLines[finalLines.length - 2] - finalLines[0])}
                    height={(finalLines[finalLines.length - 1] - finalLines[1])}
                    stroke={color}
                    strokeWidth={5}
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newCircle});
        }
    };
    const handleImageClick = (event) => {
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        if (selectedTool === "text") {
            setLines([...lines, point.x, point.y]);
            setTextInputModalVisible(true);
        }
    };

    const handleSizeChange = (size) => {
        setSize(parseInt(size));
    };

    const handleUndo = () => {
        dispatch({type: "UNDO"});
    };

    const handleRedo = () => {
        dispatch({type: "REDO"});
    };
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === "z") {
                handleUndo();
            } else if (event.ctrlKey && event.key === "y") {
                handleRedo();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleUndo, handleRedo]);

    const handleFontSelect = (font) => {
        setSelectedFont(font);
    };

    const handleTouchStart = (event) => {
        setIsDrawing(true);
        setLines([]);
    };

    const handleTouchMove = (event) => {
        if (!isDrawing) {
            return;
        }
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        setLines([...lines, point.x, point.y]);
    };

    const handleTouchEnd = (event) => {
        const stage = stageRef.current;
        setIsDrawing(false);
        if (selectedTool === "pen") {
            const newLine = (
                <Line
                    points={lines}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "text") {
            setLines([...lines, point.x, point.y]);
            setTextInputModalVisible(true);
        }
    };

    const handleOk = () => {
        const stage = stageRef.current;

        const posX = lines[lines.length - 2];
        const posY = lines[lines.length - 1];

        const maxWidth = Math.min(
            posX,
            stage.width() - posX,
            posY,
            stage.height() - posY
        );

        const newText = (
            <Text
                x={posX}
                y={posY}
                text={textInputValue}
                fontSize={size}
                fill={color}
                fontFamily={selectedFont}
                width={maxWidth}
                wrap="word" // specify the wrapping mode
            />
        );
        dispatch({type: "ADD_ELEMENT", payload: newText});
        setTextInputModalVisible(false);
    };

    const handleCancel = () => {
        setTextInputModalVisible(false);
    };

    const handleInputChange = (e) => {
        setTextInputValue(e.target.value);
    };
    return (
        <>
            {textInputModalVisible && (
                <Modal
                    title="Enter Text"
                    visible={textInputModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Input
                        type="text"
                        value={textInputValue}
                        onChange={handleInputChange}
                        style={{
                            fontFamily: selectedFont,
                            fontSize: size,
                            color: color,
                            textRendering: "optimizeLegibility",
                            zIndex: 9999999999999999999,
                        }}
                    />
                </Modal>
            )}

            <Space direction="vertical" style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Row>
                    <Col span={24}>
                        <Space direction="horizontal" style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <label htmlFor="file-input" className="ant-btn">
                                <UploadIcon/>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,image/heif"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    hidden
                                />
                            </label>

                            <Dropdown overlay={
                                <Menu>
                                    {fontOptions.map((font) => (
                                        <Menu.Item
                                            key={font}
                                            onClick={() => handleFontSelect(font)}
                                        >
                                            {font}
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            }>
                                <Button>{selectedFont}</Button>
                            </Dropdown>

                            <Dropdown overlay={
                                <Menu>
                                    {fontSize.map((size) => (
                                        <Menu.Item
                                            key={size}
                                            onClick={() => handleSizeChange(size)}
                                        >
                                            {size}
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            }>
                                <Button>{size}</Button>
                            </Dropdown>

                            <ColorPicker value={color}
                                         size={"large"}
                                         onChangeComplete={(color) => {
                                             setColor(color.toHexString());
                                         }}/>

                            <Button onClick={() => handleToolSelect("text")} icon={<TextIcon/>} size={"large"}
                                    type={selectedTool === "text" ? "primary" : "default"}></Button>

                            <Button onClick={() => handleToolSelect("line")} icon={<LineIcon/>} size={"large"}
                                    type={selectedTool === "line" ? "primary" : "default"}></Button>

                            <Button onClick={() => handleToolSelect("circle")} icon={<CircleIcon/>} size={"large"}
                                    type={selectedTool === "circle" ? "primary" : "default"}></Button>

                            <Button onClick={() => handleToolSelect("rectangle")} icon={<RectangleIcon/>}
                                    type={selectedTool === "rectangle" ? "primary" : "default"}
                                    size={"large"}></Button>

                            <Button onClick={() => handleToolSelect("pen")} icon={<Pencil/>} size={"large"}
                                    type={selectedTool === "pen" ? "primary" : "default"}></Button>

                            <Button
                                onClick={handleUndo}
                                disabled={undoStack.length === 0}
                                icon={<Undo/>}
                                size={"large"}
                            >

                            </Button>

                            <Button
                                onClick={handleRedo}
                                disabled={redoStack.length === 0}
                                icon={<Redo/>}
                                size={"large"}
                            >

                            </Button>

                            <Button onClick={handleDownload} icon={<Download/>} size={"large"}></Button>
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Stage
                                width={window.innerWidth - 400}
                                height={window.innerHeight - 200}
                                onClick={handleImageClick}
                                ref={stageRef}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                <Layer ref={layerRef}>
                                    {image && (
                                        <Image
                                            image={image}
                                            width={window.innerWidth - 400}
                                            height={window.innerHeight - 200}
                                            style={{objectFit: "fill"}}
                                        />
                                    )}
                                    {/* <Image/> */}
                                    {elements.map((element, index) => (
                                        <React.Fragment key={index}>{element}</React.Fragment>
                                    ))}
                                </Layer>
                            </Stage>
                        </div>
                    </Col>
                </Row>
            </Space>
        </>
    );
}
