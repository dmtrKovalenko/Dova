type selector = {
  query: string,
  multiple: bool,
};

let selector = value => { query: value, multiple: false }

let id = id => {query: "#" ++ id, multiple: false};

let ariaLabel = labelValue => {
  query: "[aria-label=\"" ++ labelValue ++ "\"]",
  multiple: false,
};