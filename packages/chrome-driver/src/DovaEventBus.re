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
  type elementCoords = {
    x: float,
    y: float,
  };

  type cmd =
    | Success
    | Fail(DovaApi.dovaErrors)
    | ElementReadyForInteraction(elementCoords)
    | Get(int);

  let sendResponse = (port, command: cmd) => {
    port->Chrome.Port.postMessage(ChromeHelper.serializeVariant(command));
  };

  let on = (port: Chrome.Port.t, handler: cmd => unit) => {
    port.onMessage
    ->Chrome.Port.addListener(response =>
        response |> ChromeHelper.deserializeVariant |> handler
      );
  };
};