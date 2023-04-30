"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var TextIcon = function TextIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    id: "Icons",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    viewBox: "0 0 32 32",
    xmlSpace: "preserve",
    width: "35px",
    height: "35px",
    fill: "#000000"
  }, props), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_bgCarrier",
    strokeWidth: 0
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_tracerCarrier",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("g", {
    id: "SVGRepo_iconCarrier"
  }, /*#__PURE__*/React.createElement("style", {
    type: "text/css"
  }, " .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} "), /*#__PURE__*/React.createElement("circle", {
    className: "st0",
    cx: 6,
    cy: 6,
    r: 3
  }), /*#__PURE__*/React.createElement("circle", {
    className: "st0",
    cx: 26,
    cy: 6,
    r: 3
  }), /*#__PURE__*/React.createElement("circle", {
    className: "st0",
    cx: 6,
    cy: 26,
    r: 3
  }), /*#__PURE__*/React.createElement("circle", {
    className: "st0",
    cx: 26,
    cy: 26,
    r: 3
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 6,
    y1: 9,
    x2: 6,
    y2: 23
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 26,
    y1: 9,
    x2: 26,
    y2: 23
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 9,
    y1: 26,
    x2: 23,
    y2: 26
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 9,
    y1: 6,
    x2: 23,
    y2: 6
  }), /*#__PURE__*/React.createElement("polyline", {
    className: "st0",
    points: "11,13 11,11 21,11 21,13 "
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 14,
    y1: 21,
    x2: 18,
    y2: 21
  }), /*#__PURE__*/React.createElement("line", {
    className: "st0",
    x1: 16,
    y1: 21,
    x2: 16,
    y2: 11
  })));
};
var _default = TextIcon;
exports["default"] = _default;