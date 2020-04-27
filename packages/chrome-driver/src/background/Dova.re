open DovaApi;

let make = (port, debuggee) => {
  {contains: Assertions.contains(port), click: Click.click(port, debuggee)}
};