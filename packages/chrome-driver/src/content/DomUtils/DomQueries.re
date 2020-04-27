open Webapi.Dom;
open DovaApi;
open Belt.Result;

let verifyElementsCount = nodeList => nodeList |> NodeList.length > 0;

let findElement = (selector: By.selector) => {
  let elements = document |> Document.querySelectorAll(selector.query);
  Js.log(elements)

  switch (elements->NodeList.length) {
  | 1 =>
    elements
    |> NodeList.item(0)
    |> (el => Belt.Option.flatMap(el, Element.ofNode))
    |> (
      fun
      | Some(el) => Ok(el)
      | None => Error(NoElementsFound)
    )
  | 0 => Error(NoElementsFound)
  | _ => Error(MultipleElementsNotSupported)
  };
};

let getElementCoords = node => {
  open! DovaEventBus.Response;

  node
  |> Element.getBoundingClientRect
  |> (res => {x: res->DomRect.x, y: res->DomRect.y});
};