// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Js_mapperRt = require("bs-platform/lib/js/js_mapperRt.js");

var Port = { };

var Runtime = { };

var Tabs = { };

var jsMapperConstantArray = [
  /* tuple */[
    -410572746,
    "mouseWheel"
  ],
  /* tuple */[
    99125250,
    "mouseReleased"
  ],
  /* tuple */[
    462168829,
    "mousePressed"
  ],
  /* tuple */[
    707968974,
    "mouseMoved"
  ]
];

function mouseEventTypeToJs(param) {
  return Js_mapperRt.binarySearch(4, param, jsMapperConstantArray);
}

function mouseEventTypeFromJs(param) {
  return Js_mapperRt.revSearch(4, jsMapperConstantArray, param);
}

var jsMapperConstantArray$1 = [
  /* tuple */[
    -1055860185,
    "back"
  ],
  /* tuple */[
    -944764921,
    "left"
  ],
  /* tuple */[
    -922086728,
    "none"
  ],
  /* tuple */[
    -866200747,
    "middle"
  ],
  /* tuple */[
    -439688763,
    "forward"
  ],
  /* tuple */[
    -379319332,
    "right"
  ]
];

function mouseButtonToJs(param) {
  return Js_mapperRt.binarySearch(6, param, jsMapperConstantArray$1);
}

function mouseButtonFromJs(param) {
  return Js_mapperRt.revSearch(6, jsMapperConstantArray$1, param);
}

var jsMapperConstantArray$2 = [
  /* tuple */[
    5592281,
    "pen"
  ],
  /* tuple */[
    207951397,
    "mouse"
  ]
];

function pointerTypeToJs(param) {
  return Js_mapperRt.binarySearch(2, param, jsMapperConstantArray$2);
}

function pointerTypeFromJs(param) {
  return Js_mapperRt.revSearch(2, jsMapperConstantArray$2, param);
}

function dispatchMouseEvent(debuggee, type_, pointer, x, y, clickCount, button, onDone, param) {
  var tmp = {
    type: Js_mapperRt.binarySearch(4, type_, jsMapperConstantArray)
  };
  if (x !== undefined) {
    tmp.x = Caml_option.valFromOption(x);
  }
  if (y !== undefined) {
    tmp.y = Caml_option.valFromOption(y);
  }
  var tmp$1 = Belt_Option.map(button, mouseButtonToJs);
  if (tmp$1 !== undefined) {
    tmp.button = Caml_option.valFromOption(tmp$1);
  }
  var tmp$2 = Belt_Option.map(pointer, pointerTypeToJs);
  if (tmp$2 !== undefined) {
    tmp.pointer = Caml_option.valFromOption(tmp$2);
  }
  if (clickCount !== undefined) {
    tmp.clickCount = Caml_option.valFromOption(clickCount);
  }
  chrome.debugger.sendCommand(debuggee, "Input.dispatchMouseEvent", tmp, onDone !== undefined ? onDone : (function (prim) {
            return /* () */0;
          }));
  return /* () */0;
}

var Input = {
  mouseEventTypeToJs: mouseEventTypeToJs,
  mouseEventTypeFromJs: mouseEventTypeFromJs,
  mouseButtonToJs: mouseButtonToJs,
  mouseButtonFromJs: mouseButtonFromJs,
  pointerTypeToJs: pointerTypeToJs,
  pointerTypeFromJs: pointerTypeFromJs,
  dispatchMouseEvent: dispatchMouseEvent
};

var Debugger = {
  debugger_protocol_version: "1.2",
  Input: Input
};

exports.Port = Port;
exports.Runtime = Runtime;
exports.Tabs = Tabs;
exports.Debugger = Debugger;
/* No side effect */
