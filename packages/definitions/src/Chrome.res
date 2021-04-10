module Port = {
  type onMessage
  type t = {onMessage: onMessage}

  @bs.send
  external addListener: (onMessage, 'a => unit) => unit = "addListener"

  @bs.send
  external removeListener: (onMessage, 'a => unit) => unit = "removeListener"

  @bs.send external postMessage: (t, 'a) => unit = "postMessage"
}

type connectOptions = {name: string}

module Runtime = {
  @val external id: string = "chrome.runtime.id"
  @val
  external connect: (string, connectOptions) => Port.t = "chrome.runtime.connect"
  @val
  external onConnect: (Port.t => unit) => unit = "chrome.runtime.onConnect.addListener"

  @val
  external sendMessage: (string, 'a, 'b => unit) => unit = "chrome.runtime.sendMessage"
  @val
  external onMessage: (('a, 'b, 'c) => unit) => unit = "chrome.runtime.onMessage.addListener"
}

module Tabs = {
  type tab = {
    id: int,
    active: bool,
    url: string,
    status: string,
  }

  @val
  external connect: (int, connectOptions) => Port.t = "chrome.tabs.connect"

  @deriving(abstract)
  type createTabOptions = {
    @optional
    url: string,
  }

  @val
  external create: (createTabOptions, tab => unit) => unit = "chrome.tabs.create"

  type updateOpts = {url: string}

  @val
  external update: (int, updateOpts, tab => unit) => unit = "chrome.tabs.update"

  @val
  external onUpdated: ((int, 'a, tab) => unit) => unit = "chrome.tabs.onUpdated.addListener"

  @val
  external sendMessage: (int, 'a, 'b => unit) => unit = "chrome.tabs.sendMessage"
}

module Debugger = {
  let debugger_protocol_version = "1.2"

  type debuggee = {tabId: int}

  @val
  external attach: (debuggee, string) => unit = "chrome.debugger.attach"

  @val external detach: debuggee => unit = "chrome.debugger.detach"

  @val
  external sendCommand: (debuggee, string, 'a, 'b => unit) => unit = "chrome.debugger.sendCommand"

  module Input = {
    @deriving(jsConverter)
    type mouseEventType = [
      | #mousePressed
      | #mouseReleased
      | #mouseMoved
      | #mouseWheel
    ]

    @deriving(jsConverter)
    type mouseButton = [
      | #none
      | #left
      | #right
      | #middle
      | #back
      | #forward
    ]

    @deriving(jsConverter)
    type pointerType = [#mouse | #pen]

    @deriving(abstract)
    type mouseEventOptions = {
      @as("type")
      type_: string,
      @optional
      x: float,
      @optional
      y: float,
      @optional
      button: string,
      @optional
      pointer: string,
      @optional
      clickCount: int,
    }

    let makeOnResolveCb = x =>
      switch x {
      | Some(cb) => cb
      | None => ignore
      }

    let dispatchMouseEvent = (
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
      )

    @deriving(jsConverter)
    type keyEventType = [#keyDown | #keyUp | #rawKeyDown | #char]

    @deriving(abstract)
    type keyEventOptions = {
      @as("type")
      type_: string,
      @optional
      modifiers: int,
      @optional
      text: string,
      @optional
      unmodifiedText: string,
      @optional
      key: string,
      @optional
      code: string,
      @optional
      keyCode: int,
      @optional
      location: int,
    }

    let dispatchKeyEvent = (
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
      )
  }
}
