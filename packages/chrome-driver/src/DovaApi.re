type elementCoords = {
  x: float,
  y: float,
};

type dova = {
  contains: By.selector => Js.Promise.t(bool),
  click: By.selector => Js.Promise.t(unit),
  clickByCoords: elementCoords => Js.Promise.t(unit),
};

type dovaErrors =
  | NoElementsFound
  | MultipleElementsNotSupported;