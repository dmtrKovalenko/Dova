open DovaEventBus

let execute = (selector: By.selector) => {
  selector
  ->DomQueries.findElementsRetryable
  ->Future.map(Response.responseOfResult(_ => Response.Success))
}
