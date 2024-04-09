"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CloseIcon = function (props) { return (React.createElement("svg", __assign({ width: "35px", height: "35px", viewBox: "0 0 48 48", xmlns: "http://www.w3.org/2000/svg", fill: "#000000" }, props),
    React.createElement("g", { id: "SVGRepo_bgCarrier", strokeWidth: 0 }),
    React.createElement("g", { id: "SVGRepo_tracerCarrier", strokeLinecap: "round", strokeLinejoin: "round" }),
    React.createElement("g", { id: "SVGRepo_iconCarrier" },
        React.createElement("title", null, "close-circle"),
        React.createElement("g", { id: "Layer_2", "data-name": "Layer 2" },
            React.createElement("g", { id: "invisible_box", "data-name": "invisible box" },
                React.createElement("rect", { width: 48, height: 48, fill: "none" })),
            React.createElement("g", { id: "icons_Q2", "data-name": "icons Q2" },
                React.createElement("path", { d: "M24,6A18,18,0,1,1,6,24,18.1,18.1,0,0,1,24,6m0-4A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Z" }),
                React.createElement("path", { d: "M26.8,24l5.6-5.5a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2L24,21.2l-5.6-5.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7L21.2,24l-5.6,5.5a2.1,2.1,0,0,0-.2,2.7,1.9,1.9,0,0,0,3,.2L24,26.8l5.6,5.6a1.9,1.9,0,0,0,3-.2,2.1,2.1,0,0,0-.2-2.7Z" })))))); };
exports.default = CloseIcon;
