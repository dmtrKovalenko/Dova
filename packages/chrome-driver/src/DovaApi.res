type elementCoords = {
  x: float,
  y: float,
}

type dova = {
  contains: By.selector => Js.Promise.t<bool>,
  click: By.selector => Js.Promise.t<unit>,
  clickByCoords: elementCoords => Js.Promise.t<unit>,
  press: string => Js.Promise.t<unit>,
}

type dovaErrors<'a> =
  | NoElementsFound
  | MultipleElementsNotSupported
  | KeyIsNotSupported(string)
  | UnhandledError('a)