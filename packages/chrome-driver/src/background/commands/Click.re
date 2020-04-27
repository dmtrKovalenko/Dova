open DovaEventBus;
open DovaDefinitions;
open DovaDefinitions.PromiseMonad;

let performClick = ({x, y}: DovaApi.elementCoords, debuggee, resolve) => {
  Js.log2("Clicking", DovaApi.{x, y});

  Chrome.Debugger.Input.dispatchMouseEvent(
    debuggee,
    ~type_=`mousePressed,
    ~button=`left,
    ~x,
    ~y,
    ~clickCount=1,
    ~onDone=Js.log,
    (),
  );

  Chrome.Debugger.Input.dispatchMouseEvent(
    debuggee,
    ~type_=`mouseReleased,
    ~button=`left,
    ~x,
    ~y,
    ~clickCount=1,
    ~onDone=resolve,
    (),
  );

  ();
};

let click = (port, debuggee, selector) =>
  defer(resolve =>
    port
    ->Request.send(PrepeareElementForInteraction(selector))
    ->Response.on(
        fun
        | ElementReadyForInteraction(coords) =>
          performClick(coords, debuggee, _ => resolve(. ignore()))
          |> (_ => Response.Handled)
        | _ => Response.Continue,
      )
  );

let clickByCoords = (_port, debuggee, coords) =>
  defer(resolve => performClick(coords, debuggee, _ => resolve(. ignore())));