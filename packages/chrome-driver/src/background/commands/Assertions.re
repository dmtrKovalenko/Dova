open DovaEventBus;
open DovaDefinitions.PromiseMonad;

let contains = (port, selector) =>
  defer(resolve =>
    port
    ->Request.send(Contains(selector))
    ->Response.on(
        fun
        | Success => resolve(. true) |> (_ => Response.Handled)
        | Fail(_err) => resolve(. false) |> (_ => Response.Handled)
        | _ => Response.Continue,
      )
  );