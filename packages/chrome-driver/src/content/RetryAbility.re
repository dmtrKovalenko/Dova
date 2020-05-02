type retryAbilityResult('a) =
  | Stop('a)
  | Continue('a);

let rec retry = (fn, ~onResolve, ~delay, ~timeout, ~iterationCount=0, ()) => {
  fn()
  |> (
    fun
    | Stop(res) => onResolve(res)
    | Continue(res) =>
      if (iterationCount * delay < timeout) {
        Js.Global.setTimeout(
          _ =>
            retry(
              fn,
              ~onResolve,
              ~delay,
              ~timeout,
              ~iterationCount=iterationCount + 1,
              ()
            ),
          delay,
        )
        |> ignore;
      } else {
        onResolve(res);
      }
  );
};