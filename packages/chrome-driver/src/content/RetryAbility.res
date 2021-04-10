type retryAbilityResult<'a> =
  | Stop('a)
  | Continue('a)

let rec retryWithCb = (fn, ~context, ~onResolve, ~delay, ~timeout, ~iterationCount=0, ()) =>
  fn(context) |> (
    x =>
      switch x {
      | Stop(res) => onResolve(res)
      | Continue(res) if iterationCount * delay < timeout =>
        Js.Global.setTimeout(
          _ =>
            retryWithCb(fn, ~context=Some(res), ~onResolve, ~delay, ~timeout, ~iterationCount=iterationCount + 1, ()),
          delay,
        )->ignore
      | Continue(res) => onResolve(res)
      }
  )

let retry = (fn, ~delay, ~context=None, ~timeout, ()) =>
  Future.make(onResolve => {
    retryWithCb(fn, ~context, ~onResolve, ~delay, ~timeout, ())
    None
  })
