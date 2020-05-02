open DovaEventBus;
open Belt.Result;
open DovaDefinitions.PromiseMonad;

let execute = (selector: By.selector, sendResponse) => {
  DomQueries.findElementsRetryable(selector)
  >>= (
    fun
    | Ok(node) =>
      Response.ElementReadyForInteraction(
        DomQueries.getElementCoords(node) |> Helpers.logAndReturn,
      )
    | Error(err) => Response.Fail(err)
  )
  >>= sendResponse
  |> ignore;
};