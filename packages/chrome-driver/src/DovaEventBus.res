open DovaDefinitions

module Request = {
  type cmd =
    | PrepeareElementForInteraction(By.selector)
    | Contains(By.selector)

  let send = (port, command: cmd) => {
    Js.log2("Send command", command)
    port->Chrome.Port.postMessage(command)
    port
  }
}

module Response = {
  type cmd<'error> =
    | Success
    | Fail(DovaApi.dovaErrors<'error>)
    | ElementReadyForInteraction(DovaApi.elementCoords)
    | Get(int)

  let ofResult = (map, res) =>
    switch res {
    | Ok(value) => map(value)
    | Error(error) => Fail(DovaApi.UnhandledError(error))
    }

  let sendResponse = (port, command) => port->Chrome.Port.postMessage(command)

  type handlerResult =
    | Handled
    | Continue

  let on = (port: Chrome.Port.t, handler: cmd<'error> => handlerResult) => {
    let rec callback = response =>
      response
      |> Helpers.logAndReturn2("Got command response")
      |> handler
      |> (
        x =>
          switch x {
          | Handled => port.onMessage->Chrome.Port.removeListener(callback)
          | Continue => ignore()
          }
      )

    port.onMessage->Chrome.Port.addListener(callback)
  }
}
