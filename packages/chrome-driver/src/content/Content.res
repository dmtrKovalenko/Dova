open DovaEventBus
open DovaDefinitions

let executeCommand = (port, command) => {
  switch command {
  | Request.PrepeareElementForInteraction(selector) =>
    CmdPrepeareElementForInteraction.execute(selector)
  | Request.Contains(selector) => CmdContains.execute(selector)
  }->Future.get(Response.sendResponse(port))
}

Chrome.Runtime.onConnect(port =>
  port.onMessage->Chrome.Port.addListener(msg => msg |> executeCommand(port))
)

if false {
  Webapi.Dom.document |> Webapi.Dom.Document.addMouseMoveEventListener(e =>
    Js.log3(
      "Mouse move",
      "[x:" ++ e->Webapi.Dom.MouseEvent.pageX->string_of_int,
      "y:" ++ (e->Webapi.Dom.MouseEvent.pageY->string_of_int ++ "]"),
    )
  )

  ignore()
}
