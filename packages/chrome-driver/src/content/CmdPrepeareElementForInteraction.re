open DovaEventBus;
open Belt.Result;

type coords = {
  x: float,
  y: float,
};

let execute = (selector: By.selector) => {
  DomQueries.findElement(selector)
  |> Helpers.logAndReturn
  |> (
    fun
    | Ok(node) =>
      Response.ElementReadyForInteraction(DomQueries.getElementCoords(node))
    | Error(err) => Response.Fail(err)
  )
};