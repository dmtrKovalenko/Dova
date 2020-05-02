open DovaDefinitions;
open PromiseMonad;

let waitTabToBeActive = (id, onActive) => {
  Chrome.Tabs.onUpdated((changedId, _, tab) =>
    if (changedId === id && tab.status === "complete") {
      onActive(tab);
    }
  );
};

type dova11232 = {type_: string};

let visit = url =>
  defer(resolve =>
    Chrome.Tabs.createTabOptions()
    ->Chrome.Tabs.create(tab => {
        open! Chrome.Tabs;

        tab.id
        ->Chrome.Tabs.update({url: url}, tab => {
            waitTabToBeActive(
              tab.id,
              tab => {
                let debugee = Chrome.Debugger.{tabId: tab.id};
                Chrome.Debugger.attach(debugee, "1.2");

                tab.id->Chrome.Tabs.connect({name: "Dova tests"})
                |> (port => resolve(Dova.make(port, debugee)) |> ignore);
              },
            )
          });
      })
  );