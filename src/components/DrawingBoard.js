/**
 * © 2023 Amrutham Suresh Kumar. All rights reserved.
This work is © 2023 Amrutham Suresh Kumar  and is licensed under MIT license.
All code contained within this work is the property of Amrutham Suresh Kumar. 
Unauthorized copying, distribution or use of this code, whether in part or in whole, is strictly prohibited without express written permission from Amrutham Suresh Kumar. 
Any unauthorized use may result in legal action.
 */

import React, { useState, useRef, useReducer } from "react";
import { Stage, Layer, Image, Text, Circle, Line } from "react-konva";
import {
  Download,
  TextIcon,
  Undo,
  Redo,
  CircleIcon,
  CloseIcon,
  Pencil,
} from "../svg";
import {
  Col,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";

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
  const [{ elements, undoStack, redoStack }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState(null);
  const stageRef = useRef(null);
  const layerRef = useRef();

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
    console.log("u=image");
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
      dispatch({ type: "ADD_ELEMENT", payload: newLine });
    }
  };
  const handleImageClick = (event) => {
    const stage = stageRef.current;
    let pointerPos = stage.getPointerPosition();
    if (selectedTool === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = `${pointerPos.y}px`;
      input.style.left = `${pointerPos.x}px`;
      input.style.fontFamily = selectedFont;
      input.style.fontSize = { size };
      input.style.color = { color };
      input.style.textRendering = "optimizeLegibility";
      input.style.zIndex = "9999999999999999999";
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 || event.key === "Enter") {
          const maxWidth = Math.min(
            pointerPos.x,
            stage.width() - pointerPos.x,
            pointerPos.y,
            stage.height() - pointerPos.y
          );
          const newText = (
            <Text
              x={pointerPos.x}
              y={pointerPos.y}
              text={input.value}
              fontSize={size}
              fill={color}
              fontFamily={selectedFont}
              width={maxWidth}
              wrap="wrap"
            />
          );
          dispatch({ type: "ADD_ELEMENT", payload: newText });
          input.remove();
        }
      });
      document.body.appendChild(input);
      input.focus();
    } else if (selectedTool === "circle") {
      const newCircle = (
        <Circle
          x={pointerPos.x}
          y={pointerPos.y}
          radius={size}
          stroke={color}
          strokeWidth={5}
        />
      );
      dispatch({ type: "ADD_ELEMENT", payload: newCircle });
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (size) => {
    setSize(parseInt(size));
  };

  const handleUndo = () => {
    dispatch({ type: "UNDO" });
  };

  const handleRedo = () => {
    dispatch({ type: "REDO" });
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
    const pointerPos = stage.getPointerPosition();
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
      dispatch({ type: "ADD_ELEMENT", payload: newLine });
    } else if (selectedTool === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = `${pointerPos.y}px`;
      input.style.left = `${pointerPos.x}px`;
      input.style.fontFamily = selectedFont;
      input.style.fontSize = { size };
      input.style.color = { color };
      input.style.textRendering = "optimizeLegibility";
      input.style.zIndex = "9999999999999999999";
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 || event.key === "Enter") {
          const maxWidth = Math.min(
            pointerPos.x,
            stage.width() - pointerPos.x,
            pointerPos.y,
            stage.height() - pointerPos.y
          );
          const newText = (
            <Text
              x={pointerPos.x}
              y={pointerPos.y}
              text={input.value}
              fontSize={size}
              fill={color}
              fontFamily={selectedFont}
              width={maxWidth}
              wrap="word" // specify the wrapping mode
            />
          );
          dispatch({ type: "ADD_ELEMENT", payload: newText });
          input.remove();
        }
      });
      document.body.appendChild(input);
      input.focus();
    } else if (selectedTool === "circle") {
      const newCircle = (
        <Circle
          x={pointerPos.x}
          y={pointerPos.y}
          radius={size}
          stroke={color}
          strokeWidth={5}
        />
      );
      dispatch({ type: "ADD_ELEMENT", payload: newCircle });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Navbar className="w-100 justify-content-center">
            <Nav>
              <label
                htmlFor="file-input"
                style={{
                  cursor: "pointer",
                  height: "30px",
                  padding: "2px 10px",
                  margin: "5px",
                  borderRadius: "5px",
                  backgroundColor: "mistyrose",
                  border: "2px solid black",
                }}
              >
                Select File
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="file-input"
                hidden
              />

              <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="light">
                  {selectedFont}
                </Dropdown.Toggle>
                <Dropdown.Menu align="start" style={{height:"200px"}}>
                  {fontOptions.map((font) => (
                    <NavDropdown.Item
                      key={font}
                      onClick={() => handleFontSelect(font)}
                    >
                      {font}
                    </NavDropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="light">
                  {size}
                </Dropdown.Toggle>
                <Dropdown.Menu align="start" style={{height:"200px"}}>
                  {fontSize.map((size) => (
                    <NavDropdown.Item
                      key={size}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </NavDropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Item>
                <label htmlFor="color-picker"></label>
                <input
                  type="color"
                  id="color-picker"
                  value={color}
                  onChange={handleColorChange}
                  style={{ margin: "15px", gap: "5px" }}
                />
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleToolSelect("text")}>
                  <TextIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleToolSelect("circle")}>
                  <CircleIcon />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => handleToolSelect("pen")}>
                  <Pencil />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                >
                  <Undo />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                >
                  <Redo />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleDownload}>
                  <Download />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <CloseIcon />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
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
                    style={{ objectFit: "fill" }}
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
    </Container>
  );
}
