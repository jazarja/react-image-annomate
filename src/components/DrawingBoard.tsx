/**
 * Original code based from https://github.com/suresh2291/react-image-annomate
 */

import React, {useReducer, useRef, useState, useEffect} from "react";
import {Ellipse, Image, Layer, Line, Rect, Stage, Text, Arrow} from "react-konva";
import Konva from "konva";
import {Button, ColorPicker, Dropdown, Input, Modal, Space, Tooltip} from "antd";
import {
    CircleIcon,
    RectangleIcon,
    Download,
    Pencil,
    Redo,
    TextIcon,
    Undo,
    UploadIcon,
    LineIcon,
    CopyIcon, ArrowIcon
} from "../svg";
import {
    copyBlobToClipboard,
} from 'copy-image-clipboard'

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

type DrawingBoardProps = {
    width: number,
    height: number,
    canDownload?: boolean,
    canCopyToClipboard?: boolean,
    canUpload?: boolean,
    image?: string
}

const defaultProps = {
    canDownload: true,
    canCopyToClipboard: true,
    canUpload: true,
    image: undefined
};

export default function DrawingBoard(props: DrawingBoardProps) {
    const {width, height, canDownload, canCopyToClipboard, canUpload, image: imageBase64} = props;
    const [selectedTool, setSelectedTool] = useState(null);
    const [{elements, undoStack, redoStack}, dispatch] = useReducer(
        reducer,
        initialState
    );
    const [color, setColor] = useState("#FF0000");
    const [image, setImage] = useState(null);
    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>();
    const [textInputModalVisible, setTextInputModalVisible] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [previewElement, setPreviewElement] = useState(null);
    const [stageWidth, setStageWidth] = useState(0);
    const [stageHeight, setStageHeight] = useState(0);
    const containerRef = useRef(null);

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
    const [path, setPath] = useState([]);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        console.log("imageBase64", imageBase64);

        const loadImage = () => {
            console.log("Loading");
            const img = new window.Image();
            img.src = imageBase64;
            img.onload = () => {
                const imageWidth = img.width
                const imageHeight = img.height;
                setImageWidth(imageWidth);
                setImageHeight(imageHeight);
                setImage(img);
            };
        };

        if (imageBase64) {
            loadImage();
        }
    }, [imageBase64]);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const container = containerRef.current.getBoundingClientRect();
                setStageWidth(Math.max(container.width, width));
                setStageHeight(Math.max(container.height, height));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setPath([]);
    }, [selectedTool]);

    const handleZoomIn = () => {
        setZoom(zoom + 0.1);
    };

    const handleZoomOut = () => {
        setZoom(zoom - 0.1);
    };

    const handleFileChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
            const componentRect = stageRef.current.getStage().container().getBoundingClientRect();
            const imageWidth = img.width
            const imageHeight = img.height;
            const stageWidth = componentRect.right - componentRect.left;
            const stageHeight = componentRect.bottom - componentRect.top;

            setImageWidth(imageWidth);
            setImageHeight(imageHeight);

            const zoomWidth = imageWidth > stageWidth ? stageWidth / imageWidth : 1;
            const zoomHeight = imageHeight > stageHeight ? stageHeight / imageHeight : 1;

            const zoom = Math.min(zoomWidth, zoomHeight);

            // if (zoom < 1) {
            //     setZoom(zoom);
            // } else
            // {
            //     setZoom(1);
            // }

            setImage(img);
        };
    };


    const handleDownload = () => {
        if (layerRef.current) {
            const url = layerRef.current.toCanvas();
            url.toBlob(async (blob) => {
                const link = document.createElement("a");
                link.download = `annotate_${new Date().getTime()}`;
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    const handleCopyToClipboard = () => {
        if (layerRef.current) {
            const url = layerRef.current.toCanvas();
            url.toBlob(async (blob) => {
                return copyBlobToClipboard(blob);
            });
        }
    };

    const handleToolSelect = (tool) => {
        setSelectedTool(tool);
    };
    const handleMouseDown = () => {
        setIsDrawing(true);
        setPath([]);
    };

    const getCurrentPosition = () => {
        const stage = stageRef.current;
        const point = stage.getPointerPosition();

        const componentRect = stageRef.current.getStage().container().getBoundingClientRect();

        const clampedX = Math.max(0, Math.min(point.x, componentRect.right - componentRect.left));
        const clampedY = Math.max(0, Math.min(point.y, componentRect.bottom - componentRect.top));
        return {x: clampedX, y: clampedY};
    }

    const handleMouseMove = (event) => {
        if (!isDrawing) {
            setPreviewElement(null);
            return;
        }

        const currentPosition = getCurrentPosition();
        setPath([...path, currentPosition.x, currentPosition.y]);

        const startX = path[0];
        const startY = path[1];

        const currentX = currentPosition.x;
        const currentY = currentPosition.y;

        const width = currentX - startX;
        const height = currentY - startY;

        let previewShape;

        switch (selectedTool) {
            case 'circle':
                previewShape = (
                    <Ellipse
                        x={startX + (Math.abs(width) / 2)}
                        y={startY + (Math.abs(height) / 2)}
                        radiusX={Math.abs(width) / 2}
                        radiusY={Math.abs(height) / 2}
                        stroke={color}
                        strokeWidth={2}
                    />
                );
                break;
            case 'rectangle':
                previewShape = (
                    <Rect
                        x={Math.min(startX, currentX)}
                        y={Math.min(startY, currentY)}
                        width={Math.abs(width)}
                        height={Math.abs(height)}
                        stroke={color}
                        strokeWidth={2}
                    />
                );
                break;
            case 'line':
                previewShape = (
                    <Line
                        points={[startX, startY, currentX, currentY]}
                        stroke={color}
                        strokeWidth={2}
                    />
                );
                break;
            case 'arrow':
                previewShape = (
                    <Arrow
                        points={[startX, startY, currentX, currentY]}
                        stroke={color}
                        strokeWidth={2}
                    />
                );
                break;
            case 'pen':
                previewShape = (
                    <Line
                        points={path}
                        stroke={color}
                        strokeWidth={2}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                    />
                );
                break;
            default:
                break;
        }

        setPreviewElement(previewShape);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        if (selectedTool === "arrow") {
            const newLine = (
                <Arrow
                    points={[path[0], path[1], path[path.length - 2], path[path.length - 1]]}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "line") {
            const newLine = (
                <Line
                    points={[path[0], path[1], path[path.length - 2], path[path.length - 1]]}
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
                    points={path}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "circle") {
            const point = getCurrentPosition();
            const finalLines = [...path, point.x, point.y]

            const radiusX = (finalLines[finalLines.length - 2] - finalLines[0]) / 2;
            const radiusY = (finalLines[finalLines.length - 1] - finalLines[1]) / 2;

            const newCircle = (
                <Ellipse
                    x={finalLines[0] + radiusX}
                    y={finalLines[1] + radiusY}
                    radiusX={radiusX}
                    radiusY={radiusY}
                    stroke={color}
                    strokeWidth={5}
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newCircle});
        } else if (selectedTool === "rectangle") {
            const point = getCurrentPosition();
            const finalLines = [...path, point.x, point.y]

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
        const point = getCurrentPosition();
        if (selectedTool === "text") {
            setPath([...path, point.x, point.y]);
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
        setPath([]);
    };

    const handleTouchMove = (event) => {
        if (!isDrawing) {
            return;
        }
        const stage = stageRef.current;
        const point = stage.getPointerPosition();
        setPath([...path, point.x, point.y]);
    };

    const handleTouchEnd = (event) => {
        setIsDrawing(false);
        if (selectedTool === "pen") {
            const newLine = (
                <Line
                    points={path}
                    stroke={color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                />
            );
            dispatch({type: "ADD_ELEMENT", payload: newLine});
        } else if (selectedTool === "text") {
            const point = getCurrentPosition();
            setPath([...path, point.x, point.y]);
            setTextInputModalVisible(true);
        }
    };

    const handleOk = () => {
        const stage = stageRef.current;

        const posX = path[path.length - 2];
        const posY = path[path.length - 1];

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
        setTextInputValue('');
        setSelectedTool(null);
    };

    const handleCancel = () => {
        setTextInputModalVisible(false);
    };

    const handleInputChange = (e) => {
        setTextInputValue(e.target.value);
    };
    return (
        <div style={{border: '1px solid black', backgroundColor: 'darkgray', padding: '0'}}>
            {textInputModalVisible && (
                <Modal
                    title="Enter Text"
                    open={textInputModalVisible}
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

                <Space direction="horizontal" style={{display: 'flex', justifyContent: 'center'}}>

                    {canUpload &&
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
                    }

                    <Dropdown
                        menu={{
                            items: fontOptions.map((font) => ({
                                key: font,
                                label: font,
                                onClick: () => handleFontSelect(font),
                            })),
                        }}
                    >
                        <Button>{selectedFont}</Button>
                    </Dropdown>

                    <Dropdown
                        menu={{
                            items: fontSize.map((size) => ({
                                key: size,
                                label: size,
                                onClick: () => handleSizeChange(size),
                            })),
                        }}
                    >
                        <Button>{size}</Button>
                    </Dropdown>

                    <ColorPicker value={color}
                                 size={"large"}
                                 onChangeComplete={(color) => {
                                     setColor(color.toHexString());
                                 }}/>

                    <Tooltip title="Insert a text" placement="bottom">
                        <Button onClick={() => handleToolSelect("text")} icon={<TextIcon/>} size={"large"}
                                type={selectedTool === "text" ? "primary" : "default"}></Button>
                    </Tooltip>

                    <Tooltip title="Draw line" placement="bottom">
                        <Button onClick={() => handleToolSelect("line")} icon={<LineIcon/>} size={"large"}
                                type={selectedTool === "line" ? "primary" : "default"}></Button>
                    </Tooltip>

                    <Tooltip title="Draw arrow" placement="bottom">
                        <Button onClick={() => handleToolSelect("arrow")} icon={<ArrowIcon/>} size={"large"}
                                type={selectedTool === "arrow" ? "primary" : "default"}></Button>
                    </Tooltip>

                    <Tooltip title="Draw circle" placement="bottom">
                        <Button onClick={() => handleToolSelect("circle")} icon={<CircleIcon/>} size={"large"}
                                type={selectedTool === "circle" ? "primary" : "default"}></Button>
                    </Tooltip>

                    <Tooltip title="Draw rectangle" placement="bottom">
                        <Button onClick={() => handleToolSelect("rectangle")} icon={<RectangleIcon/>}
                                type={selectedTool === "rectangle" ? "primary" : "default"}
                                size={"large"}></Button>
                    </Tooltip>

                    <Tooltip title="Draw freehand" placement="bottom">
                        <Button onClick={() => handleToolSelect("pen")} icon={<Pencil/>} size={"large"}
                                type={selectedTool === "pen" ? "primary" : "default"}></Button>
                    </Tooltip>

                    <Tooltip title="Undo" placement="bottom">
                        <Button
                            onClick={handleUndo}
                            disabled={undoStack.length === 0}
                            icon={<Undo/>}
                            size={"large"}
                        ></Button>
                    </Tooltip>


                    <Tooltip title="Redo" placement="bottom">
                        <Button
                            onClick={handleRedo}
                            disabled={redoStack.length === 0}
                            icon={<Redo/>}
                            size={"large"}
                        >

                        </Button>
                    </Tooltip>

                    {canDownload &&
                        <Tooltip title="Download image" placement="bottom">
                            <Button onClick={handleDownload} icon={<Download/>} size={"large"}></Button>
                        </Tooltip>
                    }
                    {canCopyToClipboard &&
                        <Tooltip title="Copy image to clipboard" placement="bottom">
                            <Button onClick={handleCopyToClipboard} icon={<CopyIcon/>} size={"large"}></Button>
                        </Tooltip>
                    }
                </Space>


                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div ref={containerRef} style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid black',
                        backgroundColor: 'gray',
                        padding: '0'
                    }}>
                        <Stage
                            scaleX={zoom}
                            scaleY={zoom}
                            width={stageWidth}
                            height={stageHeight}
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
                                        x={(stageWidth - Math.min(imageWidth, window.innerWidth / 2)) / 2}
                                        y={(stageHeight - Math.min(imageHeight, window.innerHeight / 2)) / 2}
                                        image={image}
                                        width={Math.min(imageWidth, window.innerWidth / 2)}
                                        height={Math.min(imageHeight, window.innerHeight / 2)}
                                        style={{objectFit: "fill"}}
                                    />
                                )}
                                {/* <Image/> */}
                                {previewElement}
                                {elements.map((element, index) => (
                                    <React.Fragment key={index}>{element}</React.Fragment>
                                ))}
                            </Layer>
                        </Stage>
                    </div>
                </div>

            </Space>
        </div>
    );
}
DrawingBoard.defaultProps = defaultProps;
