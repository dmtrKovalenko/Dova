open DovaEventBus;

let execute = (selector: By.selector, sendResponse) =>
  DomQueries.findElement(selector)
  |> (
    fun
    | Ok(_element) => Response.Success
    | Error(err) => Response.Fail(err)
  )
  |> sendResponse
  |> ignore