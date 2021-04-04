type retryAbilityResult<'a> =
  | Stop('a)
  | Continue('a)

let rec retry = (fn, ~onResolve, ~delay, ~timeout, ~iterationCount=0, ()) =>
  fn() |> (
    x =>
      switch x {
      | Stop(res) => onResolve(res)
      | Continue(_res) if iterationCount * delay < timeout =>
        Js.Global.setTimeout(
          _ => retry(fn, ~onResolve, ~delay, ~timeout, ~iterationCount=iterationCount + 1, ()),
          delay,
        )->ignore
      | Continue(res) => onResolve(res)
      }
  )
