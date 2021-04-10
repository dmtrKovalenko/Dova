open Webapi.Dom
open DovaApi
open Belt.Result

let verifyElementsCount = nodeList => nodeList |> NodeList.length > 0

let findElement = (selector: By.selector) => {
  let elements = document |> Document.querySelectorAll(selector.query)

  switch elements->NodeList.length {
  | 1 =>
    elements
    |> NodeList.item(0)
    |> (el => Belt.Option.flatMap(el, Element.ofNode))
    |> (
      res =>
        switch res {
        | Some(el) => Ok(el)
        | None => Error(NoElementsFound)
        }
    )

  | 0 => Error(NoElementsFound)
  | _ => Error(MultipleElementsNotSupported)
  }
}

let findElementsRetryable = selector => {
  RetryAbility.retry(_ =>
    switch findElement(selector) {
    | Error(NoElementsFound) => Error(NoElementsFound)->Continue
    | res => RetryAbility.Stop(res)
    }
  , ~delay=30, ~timeout=5000, ())
}

let getElementCoords = node => {
  open! DovaEventBus.Response

  node
  |> Element.getBoundingClientRect
  |> (
    res => {
      x: res->DomRect.x +. window->Window.pageXOffset +. res->DomRect.width /. 2.,
      y: res->DomRect.y +. window->Window.pageYOffset +. res->DomRect.height /. 2.,
    }
  )
}
