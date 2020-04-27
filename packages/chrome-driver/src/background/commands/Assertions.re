open DovaEventBus.Request;
open DovaDefinitions.PromiseMonad;

let contains = (port, selector) =>
  defer(resolve =>
    port
    ->DovaEventBus.Request.send(Contains(selector))
    ->DovaEventBus.Response.on(
        fun
        | Success => resolve(. true)
        | Fail(_err) => resolve(. false)
        | _ => (),
      )
  );