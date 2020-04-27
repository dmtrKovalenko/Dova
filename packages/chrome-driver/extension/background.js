(function (exports) {
  'use strict';

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

  function curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity) {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6,
                      a7
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [
                      a6,
                      a7
                    ]);
      case 7 :
          return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    }
  }

  function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o.length;
    if (arity === 8) {
      return o(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      return curry_8(o, a0, a1, a2, a3, a4, a5, a6, a7, arity);
    }
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE


  function selector(value) {
    return {
            query: value,
            multiple: false
          };
  }

  function id(id$1) {
    return {
            query: "#" + id$1,
            multiple: false
          };
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function let_(prom, cb) {
    return prom.then(__1(cb));
  }
  /* No side effect */

  function __(tag, block) {
    block.tag = tag;
    return block;
  }
  /* No side effect */

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

  function send(port, command) {
    port.postMessage(serializeVariant(command));
    return port;
  }

  var $$Request = {
    send: send
  };

  function sendResponse(port, command) {
    port.postMessage(serializeVariant(command));
    return /* () */0;
  }

  function on(port, handler) {
    port.onMessage.addListener((function (response) {
            return _1(handler, deserializeVariant(response));
          }));
    return /* () */0;
  }

  var $$Response = {
    sendResponse: sendResponse,
    on: on
  };
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

  function mapU(opt, f) {
    if (opt !== undefined) {
      return some(f(valFromOption(opt)));
    }
    
  }

  function map(opt, f) {
    return mapU(opt, __1(f));
  }
  /* No side effect */

  function binarySearch(upper, id, array) {
    var _lower = 0;
    var _upper = upper;
    var xs = array;
    var k = id;
    while(true) {
      var upper$1 = _upper;
      var lower = _lower;
      if (lower >= upper$1) {
        throw new Error("binarySearchAux");
      }
      var mid = (lower + upper$1 | 0) / 2 | 0;
      var match = xs[mid];
      var i = match[0];
      if (i === k) {
        return match[1];
      } else if (i < k) {
        _lower = mid + 1 | 0;
        continue ;
      } else {
        _upper = mid;
        continue ;
      }
    }}

  function revSearch(len, array, x) {
    var _i = 0;
    var len$1 = len;
    var xs = array;
    var k = x;
    while(true) {
      var i = _i;
      if (i === len$1) {
        return ;
      } else {
        var match = xs[i];
        if (match[1] === k) {
          return match[0];
        } else {
          _i = i + 1 | 0;
          continue ;
        }
      }
    }}
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

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
    return binarySearch(4, param, jsMapperConstantArray);
  }

  function mouseEventTypeFromJs(param) {
    return revSearch(4, jsMapperConstantArray, param);
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
    return binarySearch(6, param, jsMapperConstantArray$1);
  }

  function mouseButtonFromJs(param) {
    return revSearch(6, jsMapperConstantArray$1, param);
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
    return binarySearch(2, param, jsMapperConstantArray$2);
  }

  function pointerTypeFromJs(param) {
    return revSearch(2, jsMapperConstantArray$2, param);
  }

  function dispatchMouseEvent(debuggee, type_, pointer, x, y, clickCount, button, param) {
    var tmp = {
      type: binarySearch(4, type_, jsMapperConstantArray)
    };
    if (x !== undefined) {
      tmp.x = valFromOption(x);
    }
    if (y !== undefined) {
      tmp.y = valFromOption(y);
    }
    var tmp$1 = map(button, mouseButtonToJs);
    if (tmp$1 !== undefined) {
      tmp.button = valFromOption(tmp$1);
    }
    var tmp$2 = map(pointer, pointerTypeToJs);
    if (tmp$2 !== undefined) {
      tmp.pointer = valFromOption(tmp$2);
    }
    if (clickCount !== undefined) {
      tmp.clickCount = valFromOption(clickCount);
    }
    chrome.debugger.sendCommand(debuggee, "Input.dispatchMouseEvent", tmp, (function (r) {
            console.log(r);
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
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function defer(f) {
    return new Promise((function (resolve, param) {
                  _1(f, resolve);
                  return /* () */0;
                }));
  }

  function $great$great$slash(m, f) {
    return m.catch((function (e) {
                  return Promise.resolve(_1(f, e));
                }));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function performClick(param, debuggee, resolve) {
    var y = param.y;
    var x = param.x;
    console.log(x, y);
    _8(Debugger.Input.dispatchMouseEvent, debuggee, /* mousePressed */462168829, undefined, x, y, 1, /* left */-944764921, /* () */0);
    _8(Debugger.Input.dispatchMouseEvent, debuggee, /* mouseReleased */99125250, undefined, x, y, 1, /* left */-944764921, /* () */0);
    return _1(resolve, /* () */0);
  }

  function click(port, debuggee, selector) {
    return defer((function (resolve) {
                  return $$Response.on($$Request.send(port, /* PrepeareElementForInteraction */__(0, [selector])), (function (param) {
                                if (typeof param === "number" || param.tag !== /* ElementReadyForInteraction */1) {
                                  return /* () */0;
                                } else {
                                  return performClick(param[0], debuggee, (function (param) {
                                                return resolve(/* () */0);
                                              }));
                                }
                              }));
                }));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function contains(port, selector) {
    return defer((function (resolve) {
                  return $$Response.on($$Request.send(port, /* Contains */__(1, [selector])), (function (param) {
                                if (typeof param === "number") {
                                  return resolve(true);
                                } else {
                                  switch (param.tag | 0) {
                                    case /* Fail */0 :
                                        return resolve(false);
                                    case /* ElementReadyForInteraction */1 :
                                    case /* Get */2 :
                                        return /* () */0;
                                    
                                  }
                                }
                              }));
                }));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function make(port, debuggee) {
    return {
            contains: (function (param) {
                return contains(port, param);
              }),
            click: (function (param) {
                return click(port, debuggee, param);
              })
          };
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function waitTabToBeActive(id, onActive) {
    chrome.tabs.onUpdated.addListener((function (changedId, param, tab) {
            if (changedId === id && tab.status === "complete") {
              return _1(onActive, tab);
            } else {
              return 0;
            }
          }));
    return /* () */0;
  }

  function visit(url) {
    return defer((function (resolve) {
                  chrome.tabs.create({ }, (function (tab) {
                          chrome.tabs.update(tab.id, {
                                url: url
                              }, (function (tab) {
                                  return waitTabToBeActive(tab.id, (function (tab) {
                                                var debugee = {
                                                  tabId: tab.id
                                                };
                                                chrome.debugger.attach(debugee, "1.2");
                                                var port = chrome.tabs.connect(tab.id, {
                                                      name: "Dova tests"
                                                    });
                                                resolve(make(port, debugee));
                                                return /* () */0;
                                              }));
                                }));
                          return /* () */0;
                        }));
                  return /* () */0;
                }));
  }
  /* No side effect */

  // Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

  function executeTest(param) {
    return let_(visit("https://google.com"), (function (page) {
                  return let_(_1(page.contains, id("span")), (function (param) {
                                return let_(_1(page.click, selector("[data-pid=\"23\"]")), (function (kek) {
                                              console.log(kek);
                                              return defer((function (prim) {
                                                            return /* () */0;
                                                          }));
                                            }));
                              }));
                }));
  }

  $great$great$slash(executeTest(), (function (prim) {
          console.log(prim);
          return /* () */0;
        }));
  /*  Not a pure module */

  exports.executeTest = executeTest;

  return exports;

}({}));
