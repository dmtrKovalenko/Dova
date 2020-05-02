open DovaEventBus;
open DovaDefinitions;

let executeCommand = (port, command) => {
  let sendResponse = Response.sendResponse(port);

  switch (command) {
  | Request.PrepeareElementForInteraction(selector) =>
    CmdPrepeareElementForInteraction.execute(selector, sendResponse)
  | Request.Contains(selector) => CmdContains.execute(selector, sendResponse)
  | Request.Get(text) => ignore()
  };
};

Chrome.Runtime.onConnect(port => {
  port.onMessage
  ->Chrome.Port.addListener(msg =>
      msg |> ChromeHelper.deserializeVariant |> executeCommand(port)
    )
});

if (false) {
  Webapi.Dom.document
  |> Webapi.Dom.Document.addMouseMoveEventListener(e =>
       Js.log3(
         "Mouse move",
         "[x:" ++ e->Webapi.Dom.MouseEvent.pageX->string_of_int,
         "y:" ++ e->Webapi.Dom.MouseEvent.pageY->string_of_int ++ "]",
       )
     );

  ignore();
};