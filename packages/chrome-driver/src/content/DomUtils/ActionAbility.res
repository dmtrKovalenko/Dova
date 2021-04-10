open RetryAbility

module ActionAbilityContext = {
  type ctx = {coordinateHistory: array<DovaApi.elementCoords>}
  type t = Belt.Result.t<Dom.element, (ctx, string)>

  let empty = {
    coordinateHistory: [],
  }

  let recordNewCoord = (ctx, el) => {
    Error(
      {
        coordinateHistory: el
        ->DomQueries.getElementCoords
        ->(coord => [coord]->Js.Array.concat(ctx.coordinateHistory)),
      },
      "Verifying that element is not animating",
    )
  }
}

let verify = selector => {
  RetryAbility.retry(ctx => {
    open! ActionAbilityContext
    let element = DomQueries.findElement(selector)

    switch (ctx, element) {
    // start but no element found
    | (None, Error(_)) => Error(ActionAbilityContext.empty, "Element not found")->Continue
    // start, element found start recording coordinates
    | (None, Ok(element)) =>
      ActionAbilityContext.empty->ActionAbilityContext.recordNewCoord(element)->Continue
    // already verifying but element was unmounted in the middle
    | (Some(Error((ctx, _reason))), Error(_)) => Error(ctx, "Element not found")->Continue
    // not recrorded 2 points for animation verification
    | (Some(Error((ctx, _reason))), Ok(element)) if ctx.coordinateHistory->Js.Array.length < 2 =>
      ctx->ActionAbilityContext.recordNewCoord(element)->Continue
    // ready for more precise actionability checks of particular dom element
    | (Some(Error(ctx, _reason)), Ok(element)) =>
      element
      ->Visibility.isElementVisibleWithExplicitResult
      ->(
        res =>
          switch res {
          | Ok() => Ok(element)->Stop
          | Error(reason) => Error(ctx, reason)->Continue
          }
      )

    // edge case should never happen
    | (Some(Ok(el)), _) => Ok(el)->Stop
    }
  }, ~delay=200, ~timeout=4000, ())->Future.mapError(((_, reason)) => DovaApi.UnhandledError(reason))
}
