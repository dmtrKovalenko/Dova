module Port = {
  type onMessage;
  type t = {onMessage};

  [@bs.send]
  external addListener: (onMessage, 'a => unit) => unit = "addListener";

  [@bs.send]
  external removeListener: (onMessage, 'a => unit) => unit = "removeListener";

  [@bs.send] external postMessage: (t, 'a) => unit = "postMessage";
};

type connectOptions = {name: string};

module Runtime = {
  [@bs.val] external id: string = "chrome.runtime.id";
  [@bs.val]
  external connect: (string, connectOptions) => Port.t =
    "chrome.runtime.connect";
  [@bs.val]
  external onConnect: (Port.t => unit) => unit =
    "chrome.runtime.onConnect.addListener";

  [@bs.val]
  external sendMessage: (string, 'a, 'b => unit) => unit =
    "chrome.runtime.sendMessage";
  [@bs.val]
  external onMessage: (('a, 'b, 'c) => unit) => unit =
    "chrome.runtime.onMessage.addListener";
};

module Tabs = {
  type tab = {
    id: int,
    active: bool,
    url: string,
    status: string,
  };

  [@bs.val]
  external connect: (int, connectOptions) => Port.t = "chrome.tabs.connect";

  [@bs.deriving abstract]
  type createTabOptions = {
    [@bs.optional]
    url: string,
  };

  [@bs.val]
  external create: (createTabOptions, tab => unit) => unit =
    "chrome.tabs.create";

  type updateOpts = {url: string};

  [@bs.val]
  external update: (int, updateOpts, tab => unit) => unit =
    "chrome.tabs.update";

  [@bs.val]
  external onUpdated: ((int, 'a, tab) => unit) => unit =
    "chrome.tabs.onUpdated.addListener";

  [@bs.val]
  external sendMessage: (int, 'a, 'b => unit) => unit =
    "chrome.tabs.sendMessage";
};

module Debugger = {
  let debugger_protocol_version = "1.2";

  type debuggee = {tabId: int};

  [@bs.val]
  external attach: (debuggee, string) => unit = "chrome.debugger.attach";

  [@bs.val] external detach: debuggee => unit = "chrome.debugger.detach";

  [@bs.val]
  external sendCommand: (debuggee, string, 'a, 'b => unit) => unit =
    "chrome.debugger.sendCommand";

  module Input = {
    [@bs.deriving jsConverter]
    type mouseEventType = [
      | `mousePressed
      | `mouseReleased
      | `mouseMoved
      | `mouseWheel
    ];

    [@bs.deriving jsConverter]
    type mouseButton = [
      | `none
      | `left
      | `right
      | `middle
      | `back
      | `forward
    ];

    [@bs.deriving jsConverter]
    type pointerType = [ | `mouse | `pen];

    [@bs.deriving abstract]
    type mouseEventOptions = {
      [@bs.as "type"]
      type_: string,
      [@bs.optional]
      x: float,
      [@bs.optional]
      y: float,
      [@bs.optional]
      button: string,
      [@bs.optional]
      pointer: string,
      [@bs.optional]
      clickCount: int,
    };

    let makeOnResolveCb =
      fun
      | Some(cb) => cb
      | None => ignore;

    let dispatchMouseEvent =
        (
          debuggee,
          ~type_,
          ~pointer=?,
          ~x=?,
          ~y=?,
          ~clickCount=?,
          ~button=?,
          ~onDone=?,
          (),
        ) =>
      sendCommand(
        debuggee,
        "Input.dispatchMouseEvent",
        mouseEventOptions(
          ~type_=mouseEventTypeToJs(type_),
          ~button=?Belt.Option.map(button, mouseButtonToJs),
          ~pointer=?Belt.Option.map(pointer, pointerTypeToJs),
          ~x?,
          ~y?,
          ~clickCount?,
          (),
        ),
        makeOnResolveCb(onDone),
      );

    [@bs.deriving jsConverter]
    type keyEventType = [ | `keyDown | `keyUp | `rawKeyDown | `char];

    [@bs.deriving abstract]
    type keyEventOptions = {
      [@bs.as "type"]
      type_: string,
      [@bs.optional]
      modifiers: int,
      [@bs.optional]
      text: string,
      [@bs.optional]
      unmodifiedText: string,
      [@bs.optional]
      key: string,
      [@bs.optional]
      code: string,
      [@bs.optional]
      keyCode: int,
      [@bs.optional]
      location: int,
    };

    let dispatchKeyEvent =
        (
          debugee,
          ~type_,
          ~keycodeDefintion: ChromeKeyboardDefintion.chromeKeyboardDefintion,
          ~modifiers=?,
          ~text=?,
          ~unmodifiedText=?,
          ~onDone=?,
          (),
        ) =>
      sendCommand(
        debugee,
        "Input.dispatchKeyEvent",
        keyEventOptions(
          ~type_=keyEventTypeToJs(type_),
          ~modifiers?,
          ~text?,
          ~unmodifiedText?,
          ~key=keycodeDefintion.key,
          ~code=keycodeDefintion.code,
          ~keyCode=keycodeDefintion.keyCode,
          ~location=keycodeDefintion.location,
          (),
        ),
        makeOnResolveCb(onDone),
      );
  };
};