open DovaApi;
open DovaDefinitions.PromiseMonad;

let wait = milliseconds =>
  defer(resolve => Js.Global.setTimeout(resolve, milliseconds));

let executeTest = () => {
  let%Async page =
    Visit.visit("https://dev.material-ui-pickers.dev/regression");
  let%Async _contains = page.contains(By.id("basic-datepicker"));
  let%Async _ = page.click(By.id("basic-datepicker"));

  let%Async _ = page.click(By.ariaLabel("next month"));
  let%Async _ = page.click(By.ariaLabel("next month"));

  let%Async _ = wait(350);
  let%Async _ = page.click(By.ariaLabel("Mar 19, 2019"));

  let%Async _ = page.press("Escape");

  defer(ignore);
};

executeTest() >>/ Js.log;