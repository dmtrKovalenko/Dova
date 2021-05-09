open Webapi
open Belt

@module("../../../../../src/js/dom-utils") external isBody: Dom.Element.t => bool = "isBody"
@module("../../../../../src/js/dom-utils") external isHtml: Dom.Element.t => bool = "isHtml"
@module("../../../../../src/js/dom-utils") external isOption: Dom.Element.t => bool = "isOption"
@module("../../../../../src/js/dom-utils")
external isOptionGroup: Dom.Element.t => bool = "isOptionGroup"
@module("../../../../../src/js/dom-utils")
external isTransformedToZero: Dom.Element.t => bool = "isTransformedToZero"
@module("../../../../../src/js/dom-utils")
external elIsHiddenByAncestors: Dom.Element.t => bool = "elIsHiddenByAncestors"
@module("../../../../../src/js/dom-utils")
external elIsOutOfBoundsOfAncestorsOverflow: Dom.Element.t => bool =
  "elIsOutOfBoundsOfAncestorsOverflow"
@module("../../../../../src/js/dom-utils")
external elOrAncestorIsFixedOrSticky: Dom.Element.t => bool = "elOrAncestorIsFixedOrSticky"
@module("../../../../../src/js/dom-utils")
external elHasVisibleChild: Dom.Element.t => bool = "elHasVisibleChild"
@module("../../../../../src/js/dom-utils")
external elHasNoEffectiveWidthOrHeight: Dom.Element.t => bool = "elHasNoEffectiveWidthOrHeight"
@module("../../../../../src/js/dom-utils")
external elHasStyle: (Dom.Element.t, string, string) => bool = "elHasStyle"
@module("../../../../../src/js/dom-utils")
external getFirstParentWithTagName: (Dom.Element.t, string) => Dom.Element.t =
  "getFirstParentWithTagName"

type visible = Visible | Invisible(string) | InvisibleByCssProp(string, string)

let ofBool = (isHiddden, errorMsg) => isHiddden ? Invisible(errorMsg) : Visible

module Msg = {
  let noEffectiveWidthOrHeight = "Element is hidden because it has no effective width or height"
}

let rec isElementVisible = element => {
  switch element {
  | el if isBody(el) || isHtml(el) => Visible
  | el if el->elHasStyle("visibility", "hidden") => InvisibleByCssProp("visibility", "hidden")
  | el if el->elHasStyle("visibility", "collapse") => InvisibleByCssProp("visibility", "collapse")
  | el if el->elHasStyle("opacity", "0") => InvisibleByCssProp("opacity", "0")
  | el if el->isTransformedToZero => Invisible("Because some it is not visible by transform")
  | el if isOption(el) || isOptionGroup(el) =>
    if el->elHasStyle("display", "none") {
      InvisibleByCssProp("display", "none")
    } else {
      el->getFirstParentWithTagName("select")->isElementVisible
    }
  | el if elHasNoEffectiveWidthOrHeight(el) =>
    el->elHasStyle("display", "inline")
      ? elHasVisibleChild(el)->ofBool(Msg.noEffectiveWidthOrHeight)
      : Invisible(Msg.noEffectiveWidthOrHeight)
  // TODO: handle fixed or sticky elements
  | el =>
    el
    ->elIsHiddenByAncestors
    ->ofBool("Element is hidden because of one of its parents is not visible")
  }
}

let isElementVisibleWithExplicitResult = element =>
  element->Belt.Result.map(element =>
    switch isElementVisible(element) {
    | Visible => Result.Ok(element)
    | InvisibleByCssProp(name, value) =>
      Result.Error("It has CSS prop `" ++ name ++ ":" ++ value ++ "`")
    | Invisible(reason) => Result.Error(reason)
    }
  )
