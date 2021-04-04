open DovaDefinitions
open PromiseMonad

let press = (_port, debuggee, key) =>
  deferR((resolve, _reject) => {
    let codeDefintion = ChromeKeyboardDefintion.getKeycodeDefinition(key)

    switch codeDefintion {
    | None => Js.log("Todo throw execption")
    | Some(keycodeDefintion) =>
      Chrome.Debugger.Input.dispatchKeyEvent(debuggee, ~type_=#keyDown, ~keycodeDefintion, ())

      Chrome.Debugger.Input.dispatchKeyEvent(
        debuggee,
        ~type_=#keyUp,
        ~keycodeDefintion,
        ~onDone=resolve,
        (),
      )
    }
  })
