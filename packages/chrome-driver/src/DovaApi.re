type dova = {
  contains: By.selector => Js.Promise.t(bool),
  click: By.selector => Js.Promise.t(unit),
};

type dovaErrors =
  | NoElementsFound
  | MultipleElementsNotSupported;