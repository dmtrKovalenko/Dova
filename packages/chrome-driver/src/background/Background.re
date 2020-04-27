open DovaApi;
open DovaDefinitions.PromiseMonad;

let executeTest = () => {
  let%Async page = Visit.visit("https://google.com");
  let%Async _ = page.contains(By.id("span"));
  let%Async kek = page.click(By.selector({j|[data-pid="23"]|j}));

  Js.log(kek)

  defer(ignore);
};

executeTest() >>/ Js.log;