open DovaEventBus

let execute = (selector: By.selector) =>
  DomQueries.findElementsRetryable(selector)->Future.map(
    Response.responseOfResult(el =>
      el->DomQueries.getElementCoords->Response.ElementReadyForInteraction
    ),
  )
