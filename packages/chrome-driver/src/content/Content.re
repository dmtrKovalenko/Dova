open DovaEventBus;
open DovaDefinitions;

let executeCommand = (port, command) =>
  (
    switch (command) {
    | Request.PrepeareElementForInteraction(selector) =>
      CmdPrepeareElementForInteraction.execute(selector)
    | Request.Contains(selector) => CmdContains.execute(selector)
    | Request.Get(text) => Response.Success
    }
  )
  |> Response.sendResponse(port);

Chrome.Runtime.onConnect(port => {
  port.onMessage
  ->Chrome.Port.addListener(msg =>
      msg |> ChromeHelper.deserializeVariant |> executeCommand(port)
    )
});