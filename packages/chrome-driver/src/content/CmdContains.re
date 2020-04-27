open Webapi.Dom;
open DovaEventBus;

let execute = (selector: By.selector) =>
  DomQueries.findElement(selector)
  |> (
    fun
    | Ok(_element) => Response.Success
    | Error(err) => Response.Fail(err)
  );