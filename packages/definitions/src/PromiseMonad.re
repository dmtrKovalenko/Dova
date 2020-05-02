let defer = (f): Js.Promise.t('a) =>
  Js.Promise.make((~resolve, ~reject as _) => ignore(f(a => resolve(. a))));

let deferR = (f): Js.Promise.t('a) =>
  Js.Promise.make((~resolve, ~reject) =>
    ignore(f(a => resolve(. a), b => reject(. b)))
  );

let return = (a: 'a): Js.Promise.t('a) => Js.Promise.resolve(a);

let error = (a: exn): Js.Promise.t('a) => Js.Promise.reject(a);

/** Resolve promise (Js.Promise.then_ alias) */
let (>>-) = (m: Js.Promise.t('a), f: 'a => Js.Promise.t('b)) =>
  Js.Promise.then_(f, m);

/** Resolve promise with auto return (Js.Promise.then_ alias) */
let (>>=) = (m: Js.Promise.t('a), f: 'a => 'b) =>
  Js.Promise.then_(a => return(f(a)), m);

let (>>|) = (m: Js.Promise.t('a), f: Js.Promise.error => Js.Promise.t('a)) =>
  Js.Promise.catch(f, m);

let (>>/) = (m: Js.Promise.t('a), f: Js.Promise.error => 'a) =>
  Js.Promise.catch(e => return(f(e)), m);