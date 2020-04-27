open DovaDefinitions;

module Request = {
  type cmd =
    | PrepeareElementForInteraction(By.selector)
    | Contains(By.selector)
    | Get(string);

  let send = (port, command: cmd) => {
    port->Chrome.Port.postMessage(ChromeHelper.serializeVariant(command));
    port;
  };
};

module Response = {
  type cmd =
    | Success
    | Fail(DovaApi.dovaErrors)
    | ElementReadyForInteraction(DovaApi.elementCoords)
    | Get(int);

  let sendResponse = (port, command: cmd) => {
    port->Chrome.Port.postMessage(ChromeHelper.serializeVariant(command));
  };

  type handlerResult =
    | Handled
    | Continue;

  let on = (port: Chrome.Port.t, handler: cmd => handlerResult) => {
    let rec callback = response =>
      response
      |> ChromeHelper.deserializeVariant
      |> handler
      |> (
        fun
        | Handled => port.onMessage->Chrome.Port.removeListener(callback)
        | Continue => ignore()
      );

    port.onMessage->Chrome.Port.addListener(callback);
  };
};