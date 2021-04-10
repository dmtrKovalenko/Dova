open DovaEventBus

let execute = (selector: By.selector) => {
  selector
  ->ActionAbility.verify
  ->Future.map(Response.ofResult(_ => Response.Success))
}
