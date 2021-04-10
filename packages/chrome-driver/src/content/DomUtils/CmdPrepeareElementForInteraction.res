open DovaEventBus

let execute = (selector: By.selector) => {
  ActionAbility.verify(selector)->Future.map(
    Response.ofResult(el =>
      el->DomQueries.getElementCoords->Response.ElementReadyForInteraction
    ),
  )
}
