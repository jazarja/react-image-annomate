"use strict";
/**
 * Original code based from https://github.com/suresh2291/react-image-annomate
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_konva_1 = require("react-konva");
var antd_1 = require("antd");
var svg_1 = require("../svg");
var copy_image_clipboard_1 = require("copy-image-clipboard");
var initialState = {
    elements: [],
    undoStack: [],
    redoStack: [],
};
function reducer(state, action) {
    switch (action.type) {
        case "ADD_ELEMENT":
            return __assign(__assign({}, state), { elements: __spreadArray(__spreadArray([], state.elements, true), [action.payload], false), undoStack: __spreadArray(__spreadArray([], state.undoStack, true), [state.elements], false), redoStack: [] });
        case "UNDO":
            if (state.undoStack.length === 0) {
                return state;
            }
            return __assign(__assign({}, state), { elements: state.undoStack[state.undoStack.length - 1], undoStack: state.undoStack.slice(0, -1), redoStack: __spreadArray(__spreadArray([], state.redoStack, true), [state.elements], false) });
        case "REDO":
            if (state.redoStack.length === 0) {
                return state;
            }
            return __assign(__assign({}, state), { elements: state.redoStack[state.redoStack.length - 1], undoStack: __spreadArray(__spreadArray([], state.undoStack, true), [state.elements], false), redoStack: state.redoStack.slice(0, -1) });
        default:
            return state;
    }
}
var defaultProps = {
    canDownload: true,
    canCopyToClipboard: true,
    canUpload: true,
    image: undefined
};
function DrawingBoard(props) {
    var _this = this;
    var width = props.width, height = props.height, canDownload = props.canDownload, canCopyToClipboard = props.canCopyToClipboard, canUpload = props.canUpload, imageBase64 = props.image;
    var _a = (0, react_1.useState)(null), selectedTool = _a[0], setSelectedTool = _a[1];
    var _b = (0, react_1.useReducer)(reducer, initialState), _c = _b[0], elements = _c.elements, undoStack = _c.undoStack, redoStack = _c.redoStack, dispatch = _b[1];
    var _d = (0, react_1.useState)("#FF0000"), color = _d[0], setColor = _d[1];
    var _e = (0, react_1.useState)(null), image = _e[0], setImage = _e[1];
    var stageRef = (0, react_1.useRef)(null);
    var layerRef = (0, react_1.useRef)();
    var _f = (0, react_1.useState)(false), textInputModalVisible = _f[0], setTextInputModalVisible = _f[1];
    var _g = (0, react_1.useState)(''), textInputValue = _g[0], setTextInputValue = _g[1];
    var _h = (0, react_1.useState)(null), previewElement = _h[0], setPreviewElement = _h[1];
    var _j = (0, react_1.useState)(0), stageWidth = _j[0], setStageWidth = _j[1];
    var _k = (0, react_1.useState)(0), stageHeight = _k[0], setStageHeight = _k[1];
    var containerRef = (0, react_1.useRef)(null);
    var fontOptions = [
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
    var fontSize = [
        18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,
        56,
    ];
    var _l = (0, react_1.useState)(fontSize[0]), size = _l[0], setSize = _l[1];
    var _m = (0, react_1.useState)(fontOptions[0]), selectedFont = _m[0], setSelectedFont = _m[1];
    var _o = (0, react_1.useState)(false), isDrawing = _o[0], setIsDrawing = _o[1];
    var _p = (0, react_1.useState)([]), path = _p[0], setPath = _p[1];
    var _q = (0, react_1.useState)(0), imageWidth = _q[0], setImageWidth = _q[1];
    var _r = (0, react_1.useState)(0), imageHeight = _r[0], setImageHeight = _r[1];
    var _s = (0, react_1.useState)(1), zoom = _s[0], setZoom = _s[1];
    (0, react_1.useEffect)(function () {
        console.log("imageBase64", imageBase64);
        var loadImage = function () {
            console.log("Loading");
            var img = new window.Image();
            img.src = imageBase64;
            img.onload = function () {
                var imageWidth = img.width;
                var imageHeight = img.height;
                setImageWidth(imageWidth);
                setImageHeight(imageHeight);
                setImage(img);
            };
        };
        if (imageBase64) {
            loadImage();
        }
    }, [imageBase64]);
    (0, react_1.useEffect)(function () {
        var handleResize = function () {
            if (containerRef.current) {
                var container = containerRef.current.getBoundingClientRect();
                setStageWidth(Math.max(container.width, width));
                setStageHeight(Math.max(container.height, height));
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial calculation
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        setPath([]);
    }, [selectedTool]);
    var handleZoomIn = function () {
        setZoom(zoom + 0.1);
    };
    var handleZoomOut = function () {
        setZoom(zoom - 0.1);
    };
    var handleFileChange = function (event) {
        var url = URL.createObjectURL(event.target.files[0]);
        var img = new window.Image();
        img.src = url;
        img.onload = function () {
            var componentRect = stageRef.current.getStage().container().getBoundingClientRect();
            var imageWidth = img.width;
            var imageHeight = img.height;
            var stageWidth = componentRect.right - componentRect.left;
            var stageHeight = componentRect.bottom - componentRect.top;
            setImageWidth(imageWidth);
            setImageHeight(imageHeight);
            var zoomWidth = imageWidth > stageWidth ? stageWidth / imageWidth : 1;
            var zoomHeight = imageHeight > stageHeight ? stageHeight / imageHeight : 1;
            var zoom = Math.min(zoomWidth, zoomHeight);
            // if (zoom < 1) {
            //     setZoom(zoom);
            // } else
            // {
            //     setZoom(1);
            // }
            setImage(img);
        };
    };
    var handleDownload = function () {
        if (layerRef.current) {
            var url = layerRef.current.toCanvas();
            url.toBlob(function (blob) { return __awaiter(_this, void 0, void 0, function () {
                var link;
                return __generator(this, function (_a) {
                    link = document.createElement("a");
                    link.download = "annotate_".concat(new Date().getTime());
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [2 /*return*/];
                });
            }); });
        }
    };
    var handleCopyToClipboard = function () {
        if (layerRef.current) {
            var url = layerRef.current.toCanvas();
            url.toBlob(function (blob) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (0, copy_image_clipboard_1.copyBlobToClipboard)(blob)];
                });
            }); });
        }
    };
    var handleToolSelect = function (tool) {
        setSelectedTool(tool);
    };
    var handleMouseDown = function () {
        setIsDrawing(true);
        setPath([]);
    };
    var getCurrentPosition = function () {
        var stage = stageRef.current;
        var point = stage.getPointerPosition();
        var componentRect = stageRef.current.getStage().container().getBoundingClientRect();
        var clampedX = Math.max(0, Math.min(point.x, componentRect.right - componentRect.left));
        var clampedY = Math.max(0, Math.min(point.y, componentRect.bottom - componentRect.top));
        return { x: clampedX, y: clampedY };
    };
    var handleMouseMove = function (event) {
        if (!isDrawing) {
            setPreviewElement(null);
            return;
        }
        var currentPosition = getCurrentPosition();
        setPath(__spreadArray(__spreadArray([], path, true), [currentPosition.x, currentPosition.y], false));
        var startX = path[0];
        var startY = path[1];
        var currentX = currentPosition.x;
        var currentY = currentPosition.y;
        var width = currentX - startX;
        var height = currentY - startY;
        var previewShape;
        switch (selectedTool) {
            case 'circle':
                previewShape = (react_1.default.createElement(react_konva_1.Ellipse, { x: startX + (Math.abs(width) / 2), y: startY + (Math.abs(height) / 2), radiusX: Math.abs(width) / 2, radiusY: Math.abs(height) / 2, stroke: color, strokeWidth: 2 }));
                break;
            case 'rectangle':
                previewShape = (react_1.default.createElement(react_konva_1.Rect, { x: Math.min(startX, currentX), y: Math.min(startY, currentY), width: Math.abs(width), height: Math.abs(height), stroke: color, strokeWidth: 2 }));
                break;
            case 'line':
                previewShape = (react_1.default.createElement(react_konva_1.Line, { points: [startX, startY, currentX, currentY], stroke: color, strokeWidth: 2 }));
                break;
            case 'arrow':
                previewShape = (react_1.default.createElement(react_konva_1.Arrow, { points: [startX, startY, currentX, currentY], stroke: color, strokeWidth: 2 }));
                break;
            case 'pen':
                previewShape = (react_1.default.createElement(react_konva_1.Line, { points: path, stroke: color, strokeWidth: 2, tension: 0.5, lineCap: "round", lineJoin: "round" }));
                break;
            default:
                break;
        }
        setPreviewElement(previewShape);
    };
    var handleMouseUp = function () {
        setIsDrawing(false);
        if (selectedTool === "arrow") {
            var newLine = (react_1.default.createElement(react_konva_1.Arrow, { points: [path[0], path[1], path[path.length - 2], path[path.length - 1]], stroke: color, strokeWidth: 5, tension: 0.5, lineCap: "round", lineJoin: "round" }));
            dispatch({ type: "ADD_ELEMENT", payload: newLine });
        }
        else if (selectedTool === "line") {
            var newLine = (react_1.default.createElement(react_konva_1.Line, { points: [path[0], path[1], path[path.length - 2], path[path.length - 1]], stroke: color, strokeWidth: 5, tension: 0.5, lineCap: "round", lineJoin: "round" }));
            dispatch({ type: "ADD_ELEMENT", payload: newLine });
        }
        else if (selectedTool === "pen") {
            var newLine = (react_1.default.createElement(react_konva_1.Line, { points: path, stroke: color, strokeWidth: 5, tension: 0.5, lineCap: "round", lineJoin: "round" }));
            dispatch({ type: "ADD_ELEMENT", payload: newLine });
        }
        else if (selectedTool === "circle") {
            var point = getCurrentPosition();
            var finalLines = __spreadArray(__spreadArray([], path, true), [point.x, point.y], false);
            var radiusX = (finalLines[finalLines.length - 2] - finalLines[0]) / 2;
            var radiusY = (finalLines[finalLines.length - 1] - finalLines[1]) / 2;
            var newCircle = (react_1.default.createElement(react_konva_1.Ellipse, { x: finalLines[0] + radiusX, y: finalLines[1] + radiusY, radiusX: radiusX, radiusY: radiusY, stroke: color, strokeWidth: 5 }));
            dispatch({ type: "ADD_ELEMENT", payload: newCircle });
        }
        else if (selectedTool === "rectangle") {
            var point = getCurrentPosition();
            var finalLines = __spreadArray(__spreadArray([], path, true), [point.x, point.y], false);
            var newCircle = (react_1.default.createElement(react_konva_1.Rect, { x: finalLines[0], y: finalLines[1], width: (finalLines[finalLines.length - 2] - finalLines[0]), height: (finalLines[finalLines.length - 1] - finalLines[1]), stroke: color, strokeWidth: 5 }));
            dispatch({ type: "ADD_ELEMENT", payload: newCircle });
        }
    };
    var handleImageClick = function (event) {
        var point = getCurrentPosition();
        if (selectedTool === "text") {
            setPath(__spreadArray(__spreadArray([], path, true), [point.x, point.y], false));
            setTextInputModalVisible(true);
        }
    };
    var handleSizeChange = function (size) {
        setSize(parseInt(size));
    };
    var handleUndo = function () {
        dispatch({ type: "UNDO" });
    };
    var handleRedo = function () {
        dispatch({ type: "REDO" });
    };
    react_1.default.useEffect(function () {
        var handleKeyDown = function (event) {
            if (event.ctrlKey && event.key === "z") {
                handleUndo();
            }
            else if (event.ctrlKey && event.key === "y") {
                handleRedo();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return function () {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleUndo, handleRedo]);
    var handleFontSelect = function (font) {
        setSelectedFont(font);
    };
    var handleTouchStart = function (event) {
        setIsDrawing(true);
        setPath([]);
    };
    var handleTouchMove = function (event) {
        if (!isDrawing) {
            return;
        }
        var stage = stageRef.current;
        var point = stage.getPointerPosition();
        setPath(__spreadArray(__spreadArray([], path, true), [point.x, point.y], false));
    };
    var handleTouchEnd = function (event) {
        setIsDrawing(false);
        if (selectedTool === "pen") {
            var newLine = (react_1.default.createElement(react_konva_1.Line, { points: path, stroke: color, strokeWidth: 5, tension: 0.5, lineCap: "round", lineJoin: "round" }));
            dispatch({ type: "ADD_ELEMENT", payload: newLine });
        }
        else if (selectedTool === "text") {
            var point = getCurrentPosition();
            setPath(__spreadArray(__spreadArray([], path, true), [point.x, point.y], false));
            setTextInputModalVisible(true);
        }
    };
    var handleOk = function () {
        var stage = stageRef.current;
        var posX = path[path.length - 2];
        var posY = path[path.length - 1];
        var maxWidth = Math.min(posX, stage.width() - posX, posY, stage.height() - posY);
        var newText = (react_1.default.createElement(react_konva_1.Text, { x: posX, y: posY, text: textInputValue, fontSize: size, fill: color, fontFamily: selectedFont, width: maxWidth, wrap: "word" // specify the wrapping mode
         }));
        dispatch({ type: "ADD_ELEMENT", payload: newText });
        setTextInputModalVisible(false);
        setTextInputValue('');
        setSelectedTool(null);
    };
    var handleCancel = function () {
        setTextInputModalVisible(false);
    };
    var handleInputChange = function (e) {
        setTextInputValue(e.target.value);
    };
    return (react_1.default.createElement("div", { style: { border: '1px solid black', backgroundColor: 'darkgray', padding: '0' } },
        textInputModalVisible && (react_1.default.createElement(antd_1.Modal, { title: "Enter Text", open: textInputModalVisible, onOk: handleOk, onCancel: handleCancel },
            react_1.default.createElement(antd_1.Input, { type: "text", value: textInputValue, onChange: handleInputChange, style: {
                    fontFamily: selectedFont,
                    fontSize: size,
                    color: color,
                    textRendering: "optimizeLegibility",
                    zIndex: 9999999999999999999,
                } }))),
        react_1.default.createElement(antd_1.Space, { direction: "vertical", style: { display: 'flex', justifyContent: 'flex-end' } },
            react_1.default.createElement(antd_1.Space, { direction: "horizontal", style: { display: 'flex', justifyContent: 'center' } },
                canUpload &&
                    react_1.default.createElement("label", { htmlFor: "file-input", className: "ant-btn" },
                        react_1.default.createElement(svg_1.UploadIcon, null),
                        react_1.default.createElement("input", { id: "file-input", type: "file", accept: "image/jpeg,image/jpg,image/png,image/webp,image/heif", onChange: handleFileChange, className: "file-input", hidden: true })),
                react_1.default.createElement(antd_1.Dropdown, { menu: {
                        items: fontOptions.map(function (font) { return ({
                            key: font,
                            label: font,
                            onClick: function () { return handleFontSelect(font); },
                        }); }),
                    } },
                    react_1.default.createElement(antd_1.Button, null, selectedFont)),
                react_1.default.createElement(antd_1.Dropdown, { menu: {
                        items: fontSize.map(function (size) { return ({
                            key: size,
                            label: size,
                            onClick: function () { return handleSizeChange(size); },
                        }); }),
                    } },
                    react_1.default.createElement(antd_1.Button, null, size)),
                react_1.default.createElement(antd_1.ColorPicker, { value: color, size: "large", onChangeComplete: function (color) {
                        setColor(color.toHexString());
                    } }),
                react_1.default.createElement(antd_1.Tooltip, { title: "Insert a text", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("text"); }, icon: react_1.default.createElement(svg_1.TextIcon, null), size: "large", type: selectedTool === "text" ? "primary" : "default" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Draw line", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("line"); }, icon: react_1.default.createElement(svg_1.LineIcon, null), size: "large", type: selectedTool === "line" ? "primary" : "default" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Draw arrow", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("arrow"); }, icon: react_1.default.createElement(svg_1.ArrowIcon, null), size: "large", type: selectedTool === "arrow" ? "primary" : "default" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Draw circle", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("circle"); }, icon: react_1.default.createElement(svg_1.CircleIcon, null), size: "large", type: selectedTool === "circle" ? "primary" : "default" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Draw rectangle", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("rectangle"); }, icon: react_1.default.createElement(svg_1.RectangleIcon, null), type: selectedTool === "rectangle" ? "primary" : "default", size: "large" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Draw freehand", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: function () { return handleToolSelect("pen"); }, icon: react_1.default.createElement(svg_1.Pencil, null), size: "large", type: selectedTool === "pen" ? "primary" : "default" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Undo", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: handleUndo, disabled: undoStack.length === 0, icon: react_1.default.createElement(svg_1.Undo, null), size: "large" })),
                react_1.default.createElement(antd_1.Tooltip, { title: "Redo", placement: "bottom" },
                    react_1.default.createElement(antd_1.Button, { onClick: handleRedo, disabled: redoStack.length === 0, icon: react_1.default.createElement(svg_1.Redo, null), size: "large" })),
                canDownload &&
                    react_1.default.createElement(antd_1.Tooltip, { title: "Download image", placement: "bottom" },
                        react_1.default.createElement(antd_1.Button, { onClick: handleDownload, icon: react_1.default.createElement(svg_1.Download, null), size: "large" })),
                canCopyToClipboard &&
                    react_1.default.createElement(antd_1.Tooltip, { title: "Copy image to clipboard", placement: "bottom" },
                        react_1.default.createElement(antd_1.Button, { onClick: handleCopyToClipboard, icon: react_1.default.createElement(svg_1.CopyIcon, null), size: "large" }))),
            react_1.default.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                } },
                react_1.default.createElement("div", { ref: containerRef, style: {
                        width: '100%',
                        height: '100%',
                        border: '1px solid black',
                        backgroundColor: 'gray',
                        padding: '0'
                    } },
                    react_1.default.createElement(react_konva_1.Stage, { scaleX: zoom, scaleY: zoom, width: stageWidth, height: stageHeight, onClick: handleImageClick, ref: stageRef, onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUp, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd },
                        react_1.default.createElement(react_konva_1.Layer, { ref: layerRef },
                            image && (react_1.default.createElement(react_konva_1.Image, { x: (stageWidth - Math.min(imageWidth, window.innerWidth / 2)) / 2, y: (stageHeight - Math.min(imageHeight, window.innerHeight / 2)) / 2, image: image, width: Math.min(imageWidth, window.innerWidth / 2), height: Math.min(imageHeight, window.innerHeight / 2), style: { objectFit: "fill" } })),
                            previewElement,
                            elements.map(function (element, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index }, element)); }))))))));
}
exports.default = DrawingBoard;
DrawingBoard.defaultProps = defaultProps;
