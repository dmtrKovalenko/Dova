type testRunner = {
  title: string,
  beforeAll: option<unit => Js.Promise.t<unit>>,
  beforeEach: ref<option<unit => Js.Promise.t<unit>>>,
  commmands: list<string>,
}

type keker = {beforeEach: (unit => Js.Promise.t<unit>) => unit}

let make = (title: string, innerFn: keker => unit) => {
  let testRunner = {
    title: title,
    beforeAll: None,
    beforeEach: ref(None),
    commmands: list{},
  }

  let runner: keker = {
    beforeEach: innerFn => testRunner.beforeEach := Some(innerFn),
  }

  innerFn(runner)
}

make("nothing", keker => Js.log(keker.beforeEach))

"kek" |> Js.String.replace("e", "0")

let myFn = paramA =>
  switch Js.Types.classify(paramA) {
  | Js.Types.JSString(str) => Some(str)
  | _ => None
  }

let tek = myFn("kek")
