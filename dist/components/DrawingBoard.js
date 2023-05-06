"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DrawingBoard;
var _react = _interopRequireWildcard(require("react"));
var _reactKonva = require("react-konva");
var _svg = require("../svg");
var _reactBootstrap = require("react-bootstrap");
var _reactRouterDom = require("react-router-dom");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                               * © 2023 Amrutham Suresh Kumar. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                              This work is © 2023 Amrutham Suresh Kumar  and is licensed under MIT license.
                                                                                                                                                                                                                                                                                                                                                                                              All code contained within this work is the property of Amrutham Suresh Kumar. 
                                                                                                                                                                                                                                                                                                                                                                                              Unauthorized copying, distribution or use of this code, whether in part or in whole, is strictly prohibited without express written permission from Amrutham Suresh Kumar. 
                                                                                                                                                                                                                                                                                                                                                                                              Any unauthorized use may result in legal action.
                                                                                                                                                                                                                                                                                                                                                                                               */
var initialState = {
  elements: [],
  undoStack: [],
  redoStack: []
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_ELEMENT":
      return _objectSpread(_objectSpread({}, state), {}, {
        elements: [].concat(_toConsumableArray(state.elements), [action.payload]),
        undoStack: [].concat(_toConsumableArray(state.undoStack), [state.elements]),
        redoStack: []
      });
    case "UNDO":
      if (state.undoStack.length === 0) {
        return state;
      }
      return _objectSpread(_objectSpread({}, state), {}, {
        elements: state.undoStack[state.undoStack.length - 1],
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [].concat(_toConsumableArray(state.redoStack), [state.elements])
      });
    case "REDO":
      if (state.redoStack.length === 0) {
        return state;
      }
      return _objectSpread(_objectSpread({}, state), {}, {
        elements: state.redoStack[state.redoStack.length - 1],
        undoStack: [].concat(_toConsumableArray(state.undoStack), [state.elements]),
        redoStack: state.redoStack.slice(0, -1)
      });
    default:
      return state;
  }
}
function DrawingBoard() {
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    selectedTool = _useState2[0],
    setSelectedTool = _useState2[1];
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    _useReducer2$ = _useReducer2[0],
    elements = _useReducer2$.elements,
    undoStack = _useReducer2$.undoStack,
    redoStack = _useReducer2$.redoStack,
    dispatch = _useReducer2[1];
  var _useState3 = (0, _react.useState)("#000000"),
    _useState4 = _slicedToArray(_useState3, 2),
    color = _useState4[0],
    setColor = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    image = _useState6[0],
    setImage = _useState6[1];
  var stageRef = (0, _react.useRef)(null);
  var layerRef = (0, _react.useRef)();
  var fontOptions = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", "Georgia", "Comic Sans MS", "Impact", "Tahoma", "Lucida Console", "Open Sans", "Montserrat", "Roboto", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Yu Gothic", "Meiryo UI", "MS PGothic", "MS PMincho"];
  var fontSize = [18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56];
  var _useState7 = (0, _react.useState)(fontSize[0]),
    _useState8 = _slicedToArray(_useState7, 2),
    size = _useState8[0],
    setSize = _useState8[1];
  var _useState9 = (0, _react.useState)(fontOptions[0]),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedFont = _useState10[0],
    setSelectedFont = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isDrawing = _useState12[0],
    setIsDrawing = _useState12[1];
  var _useState13 = (0, _react.useState)([]),
    _useState14 = _slicedToArray(_useState13, 2),
    lines = _useState14[0],
    setLines = _useState14[1];
  var handleFileChange = function handleFileChange(event) {
    console.log("u=image");
    var url = URL.createObjectURL(event.target.files[0]);
    var img = new window.Image();
    img.src = url;
    img.onload = function () {
      setImage(img);
    };
  };
  var handleDownload = function handleDownload() {
    var url = layerRef.current.toCanvas();
    url.toBlob( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(blob) {
        var link;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              link = document.createElement("a");
              link.download = "annotate_".concat(new Date().getTime());
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
  var handleToolSelect = function handleToolSelect(tool) {
    setSelectedTool(tool);
  };
  var handleMouseDown = function handleMouseDown() {
    setIsDrawing(true);
    setLines([]);
  };
  var handleMouseMove = function handleMouseMove(event) {
    if (!isDrawing) {
      return;
    }
    var stage = stageRef.current;
    var point = stage.getPointerPosition();
    setLines([].concat(_toConsumableArray(lines), [point.x, point.y]));
  };
  var handleMouseUp = function handleMouseUp() {
    setIsDrawing(false);
    if (selectedTool === "pen") {
      var newLine = /*#__PURE__*/_react["default"].createElement(_reactKonva.Line, {
        points: lines,
        stroke: color,
        strokeWidth: 5,
        tension: 0.5,
        lineCap: "round",
        lineJoin: "round"
      });
      dispatch({
        type: "ADD_ELEMENT",
        payload: newLine
      });
    }
  };
  var handleImageClick = function handleImageClick(event) {
    var stage = stageRef.current;
    var pointerPos = stage.getPointerPosition();
    if (selectedTool === "text") {
      var input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = "".concat(pointerPos.y, "px");
      input.style.left = "".concat(pointerPos.x, "px");
      input.style.fontFamily = selectedFont;
      input.style.fontSize = {
        size: size
      };
      input.style.color = {
        color: color
      };
      input.style.textRendering = "optimizeLegibility";
      input.style.zIndex = "9999999999999999999";
      input.focus();
      input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13 || event.key === "Enter") {
          var maxWidth = Math.min(pointerPos.x, stage.width() - pointerPos.x, pointerPos.y, stage.height() - pointerPos.y);
          var newText = /*#__PURE__*/_react["default"].createElement(_reactKonva.Text, {
            x: pointerPos.x,
            y: pointerPos.y,
            text: input.value,
            fontSize: size,
            fill: color,
            fontFamily: selectedFont,
            width: maxWidth,
            wrap: "wrap"
          });
          dispatch({
            type: "ADD_ELEMENT",
            payload: newText
          });
          input.remove();
        }
      });
      document.body.appendChild(input);
      input.focus();
    } else if (selectedTool === "circle") {
      var newCircle = /*#__PURE__*/_react["default"].createElement(_reactKonva.Circle, {
        x: pointerPos.x,
        y: pointerPos.y,
        radius: size,
        stroke: color,
        strokeWidth: 5
      });
      dispatch({
        type: "ADD_ELEMENT",
        payload: newCircle
      });
    }
  };
  var handleColorChange = function handleColorChange(event) {
    setColor(event.target.value);
  };
  var handleSizeChange = function handleSizeChange(size) {
    setSize(parseInt(size));
  };
  var handleUndo = function handleUndo() {
    dispatch({
      type: "UNDO"
    });
  };
  var handleRedo = function handleRedo() {
    dispatch({
      type: "REDO"
    });
  };
  _react["default"].useEffect(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.ctrlKey && event.key === "z") {
        handleUndo();
      } else if (event.ctrlKey && event.key === "y") {
        handleRedo();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo]);
  var handleFontSelect = function handleFontSelect(font) {
    setSelectedFont(font);
  };
  var handleTouchStart = function handleTouchStart(event) {
    setIsDrawing(true);
    setLines([]);
  };
  var handleTouchMove = function handleTouchMove(event) {
    if (!isDrawing) {
      return;
    }
    var stage = stageRef.current;
    var point = stage.getPointerPosition();
    setLines([].concat(_toConsumableArray(lines), [point.x, point.y]));
  };
  var handleTouchEnd = function handleTouchEnd(event) {
    var stage = stageRef.current;
    var pointerPos = stage.getPointerPosition();
    setIsDrawing(false);
    if (selectedTool === "pen") {
      var newLine = /*#__PURE__*/_react["default"].createElement(_reactKonva.Line, {
        points: lines,
        stroke: color,
        strokeWidth: 5,
        tension: 0.5,
        lineCap: "round",
        lineJoin: "round"
      });
      dispatch({
        type: "ADD_ELEMENT",
        payload: newLine
      });
    } else if (selectedTool === "text") {
      var input = document.createElement("input");
      input.type = "text";
      input.style.position = "absolute";
      input.style.top = "".concat(pointerPos.y, "px");
      input.style.left = "".concat(pointerPos.x, "px");
      input.style.fontFamily = selectedFont;
      input.style.fontSize = {
        size: size
      };
      input.style.color = {
        color: color
      };
      input.style.textRendering = "optimizeLegibility";
      input.style.zIndex = "9999999999999999999";
      input.focus();
      input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13 || event.key === "Enter") {
          var maxWidth = Math.min(pointerPos.x, stage.width() - pointerPos.x, pointerPos.y, stage.height() - pointerPos.y);
          var newText = /*#__PURE__*/_react["default"].createElement(_reactKonva.Text, {
            x: pointerPos.x,
            y: pointerPos.y,
            text: input.value,
            fontSize: size,
            fill: color,
            fontFamily: selectedFont,
            width: maxWidth,
            wrap: "word" // specify the wrapping mode
          });

          dispatch({
            type: "ADD_ELEMENT",
            payload: newText
          });
          input.remove();
        }
      });
      document.body.appendChild(input);
      input.focus();
    } else if (selectedTool === "circle") {
      var newCircle = /*#__PURE__*/_react["default"].createElement(_reactKonva.Circle, {
        x: pointerPos.x,
        y: pointerPos.y,
        radius: size,
        stroke: color,
        strokeWidth: 5
      });
      dispatch({
        type: "ADD_ELEMENT",
        payload: newCircle
      });
    }
  };
  var handleClose = function handleClose() {
    /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Navigate, {
      to: "/"
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Container, {
    fluid: true
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    lg: 12
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar, {
    className: "w-100 justify-content-center"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "file-input",
    style: {
      cursor: "pointer",
      height: "30px",
      padding: "2px 10px",
      margin: "5px",
      borderRadius: "5px",
      backgroundColor: "mistyrose",
      border: "2px solid black"
    }
  }, "Select File"), /*#__PURE__*/_react["default"].createElement("input", {
    id: "file-input",
    type: "file",
    accept: "image/jpeg,image/jpg,image/png,image/webp,image/heif",
    onChange: handleFileChange,
    className: "file-input",
    hidden: true
  }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown, {
    drop: "down-centered"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Toggle, {
    variant: "light"
  }, selectedFont), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Menu, {
    align: "start",
    style: {
      height: "200px"
    }
  }, fontOptions.map(function (font) {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.NavDropdown.Item, {
      key: font,
      onClick: function onClick() {
        return handleFontSelect(font);
      }
    }, font);
  }))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown, {
    drop: "down-centered"
  }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Toggle, {
    variant: "light"
  }, size), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Menu, {
    align: "start",
    style: {
      height: "200px"
    }
  }, fontSize.map(function (size) {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.NavDropdown.Item, {
      key: size,
      onClick: function onClick() {
        return handleSizeChange(size);
      }
    }, size);
  }))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: "color-picker"
  }), /*#__PURE__*/_react["default"].createElement("input", {
    type: "color",
    id: "color-picker",
    value: color,
    onChange: handleColorChange,
    style: {
      margin: "15px",
      gap: "5px"
    }
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: function onClick() {
      return handleToolSelect("text");
    }
  }, /*#__PURE__*/_react["default"].createElement(_svg.TextIcon, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: function onClick() {
      return handleToolSelect("circle");
    }
  }, /*#__PURE__*/_react["default"].createElement(_svg.CircleIcon, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: function onClick() {
      return handleToolSelect("pen");
    }
  }, /*#__PURE__*/_react["default"].createElement(_svg.Pencil, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: handleUndo,
    disabled: undoStack.length === 0
  }, /*#__PURE__*/_react["default"].createElement(_svg.Undo, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: handleRedo,
    disabled: redoStack.length === 0
  }, /*#__PURE__*/_react["default"].createElement(_svg.Redo, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: handleDownload
  }, /*#__PURE__*/_react["default"].createElement(_svg.Download, null))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
    onClick: handleClose
  }, /*#__PURE__*/_react["default"].createElement(_svg.CloseIcon, null))))))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 12
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactKonva.Stage, {
    width: window.innerWidth - 400,
    height: window.innerHeight - 200,
    onClick: handleImageClick,
    ref: stageRef,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  }, /*#__PURE__*/_react["default"].createElement(_reactKonva.Layer, {
    ref: layerRef
  }, image && /*#__PURE__*/_react["default"].createElement(_reactKonva.Image, {
    image: image,
    width: window.innerWidth - 400,
    height: window.innerHeight - 200,
    style: {
      objectFit: "fill"
    }
  }), elements.map(function (element, index) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: index
    }, element);
  })))))));
}