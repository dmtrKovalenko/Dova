open DovaEventBus;
open DovaDefinitions;
open DovaDefinitions.PromiseMonad;

let performClick = ({x, y}: Response.elementCoords, debuggee, resolve) => {
  Js.log2(x, y);
  Chrome.Debugger.Input.dispatchMouseEvent(
    debuggee,
    ~type_=`mousePressed,
    ~button=`left,
    ~x,
    ~y,
    ~clickCount=1,
    (),
  );

  Chrome.Debugger.Input.dispatchMouseEvent(
    debuggee,
    ~type_=`mouseReleased,
    ~button=`left,
    ~x,
    ~y,
    ~clickCount=1,
    (),
  );

  resolve();
};

let click = (port, debuggee, selector) =>
  defer(resolve =>
    port
    ->Request.send(PrepeareElementForInteraction(selector))
    ->Response.on(
        fun
        | ElementReadyForInteraction(coords) =>
          performClick(coords, debuggee, _ => resolve(. ignore()))
        | _ => (),
      )
  );