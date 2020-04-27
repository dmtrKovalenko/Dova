(function (exports) {
  'use strict';

  function __(tag, block) {
    block.tag = tag;
    return block;
  }
  /* No side effect */

  var out_of_memory = /* tuple */[
    "Out_of_memory",
    0
  ];

  var sys_error = /* tuple */[
    "Sys_error",
    -1
  ];

  var failure = /* tuple */[
    "Failure",
    -2
  ];

  var invalid_argument = /* tuple */[
    "Invalid_argument",
    -3
  ];

  var end_of_file = /* tuple */[
    "End_of_file",
    -4
  ];

  var division_by_zero = /* tuple */[
    "Division_by_zero",
    -5
  ];

  var not_found = /* tuple */[
    "Not_found",
    -6
  ];

  var match_failure = /* tuple */[
    "Match_failure",
    -7
  ];

  var stack_overflow = /* tuple */[
    "Stack_overflow",
    -8
  ];

  var sys_blocked_io = /* tuple */[
    "Sys_blocked_io",
    -9
  ];

  var assert_failure = /* tuple */[
    "Assert_failure",
    -10
  ];

  var undefined_recursive_module = /* tuple */[
    "Undefined_recursive_module",
    -11
  ];

  out_of_memory.tag = 248;

  sys_error.tag = 248;

  failure.tag = 248;

  invalid_argument.tag = 248;

  end_of_file.tag = 248;

  division_by_zero.tag = 248;

  not_found.tag = 248;

  match_failure.tag = 248;

  stack_overflow.tag = 248;

  sys_blocked_io.tag = 248;

  assert_failure.tag = 248;

  undefined_recursive_module.tag = 248;
  /*  Not a pure module */

  function caml_array_sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while(j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }  return result;
  }
  /* No side effect */

  function app(_f, _args) {
    while(true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      } else if (d < 0) {
        _args = caml_array_sub(args, arity, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity));
        continue ;
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat([x]));
        }
        }(f,args));
      }
    }}

  function curry_1(o, a0, arity) {
    switch (arity) {
      case 1 :
          return o(a0);
      case 2 :
          return (function (param) {
              return o(a0, param);
            });
      case 3 :
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 :
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 :
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 :
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 :
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      default:
        return app(o, [a0]);
    }
  }

  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      return curry_1(o, a0, arity);
    }
  }

  function __1(o) {
    var arity = o.length;
    if (arity === 1) {
      return o;
    } else {
      return (function (a0) {
          return _1(o, a0);
        });
    }
  }
  /* No side effect */

  var undefinedHeader = [];

  function some(x) {
    if (x === undefined) {
      var block = /* tuple */[
        undefinedHeader,
        0
      ];
      block.tag = 256;
      return block;
    } else if (x !== null && x[0] === undefinedHeader) {
      var nid = x[1] + 1 | 0;
      var block$1 = /* tuple */[
        undefinedHeader,
        nid
      ];
      block$1.tag = 256;
      return block$1;
    } else {
      return x;
    }
  }

  function valFromOption(x) {
    if (x !== null && x[0] === undefinedHeader) {
      var depth = x[1];
      if (depth === 0) {
        return ;
      } else {
        return /* tuple */[
                undefinedHeader,
                depth - 1 | 0
              ];
      }
    } else {
      return x;
    }
  }
  /* No side effect */

  function flatMapU(opt, f) {
    if (opt !== undefined) {
      return f(valFromOption(opt));
    }
    
  }

  function flatMap(opt, f) {
    return flatMapU(opt, __1(f));
  }
  /* No side effect */

  function decodeNodeType(param) {
    var switcher = param - 1 | 0;
    if (switcher > 11 || switcher < 0) {
      return /* Unknown */12;
    } else {
      return switcher;
    }
  }
  /* No side effect */

  function nodeType(self) {
    return decodeNodeType(self.nodeType);
  }
  /*  Not a pure module */

  function ofNode(node) {
    if (nodeType(node) === /* Element */0) {
      return some(node);
    }
    
  }
  /* include Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function findElement(selector) {
    var elements = document.querySelectorAll(selector.query);
    var match = elements.length;
    if (match !== 0) {
      if (match !== 1) {
        return /* Error */__(1, [/* MultipleElementsNotSupported */1]);
      } else {
        var el = elements.item(0);
        var param = flatMap((el == null) ? undefined : some(el), ofNode);
        if (param !== undefined) {
          return /* Ok */__(0, [valFromOption(param)]);
        } else {
          return /* Error */__(1, [/* NoElementsFound */0]);
        }
      }
    } else {
      return /* Error */__(1, [/* NoElementsFound */0]);
    }
  }

  function getElementCoords(node) {
    var res = node.getBoundingClientRect();
    return {
            x: res.x + window.pageXOffset + res.width / 2,
            y: res.y + window.pageYOffset + res.height / 2
          };
  }
  /* Webapi__Dom__Element Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function execute(selector) {
    var param = findElement(selector);
    if (param.tag) {
      return /* Fail */__(0, [param[0]]);
    } else {
      return /* Success */0;
    }
  }
  /* DomQueries-Driver Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE


  var serializeVariant = (function (variant) {
        return JSON.stringify({
          variant,
          tag: typeof variant === "number" ? undefined : variant.tag
        });
      });

  var deserializeVariant = (function (serializedString) {
        const { tag, variant } = JSON.parse(serializedString);
        if (typeof variant === "number") {
          return variant;
        }

        variant.tag = tag;
        return variant;
      });
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function sendResponse(port, command) {
    port.postMessage(serializeVariant(command));
    return /* () */0;
  }

  function on(port, handler) {
    var callback = function (response) {
      var param = _1(handler, deserializeVariant(response));
      if (param) {
        return /* () */0;
      } else {
        port.onMessage.removeListener(callback);
        return /* () */0;
      }
    };
    port.onMessage.addListener(callback);
    return /* () */0;
  }

  var $$Response = {
    sendResponse: sendResponse,
    on: on
  };
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function execute$1(selector) {
    var param = findElement(selector);
    if (param.tag) {
      return /* Fail */__(0, [param[0]]);
    } else {
      return /* ElementReadyForInteraction */__(1, [getElementCoords(param[0])]);
    }
  }
  /* DomQueries-Driver Not a pure module */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function executeCommand(port, command) {
    var tmp;
    switch (command.tag | 0) {
      case /* PrepeareElementForInteraction */0 :
          tmp = execute$1(command[0]);
          break;
      case /* Contains */1 :
          tmp = execute(command[0]);
          break;
      case /* Get */2 :
          tmp = /* Success */0;
          break;
      
    }
    return $$Response.sendResponse(port, tmp);
  }

  chrome.runtime.onConnect.addListener((function (port) {
          port.onMessage.addListener((function (msg) {
                  return executeCommand(port, deserializeVariant(msg));
                }));
          return /* () */0;
        }));
  /*  Not a pure module */

  exports.executeCommand = executeCommand;

  return exports;

}({}));
