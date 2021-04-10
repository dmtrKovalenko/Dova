module DovaPublic = {
  include Visit
}

module type DovaPublicLike = module type of DovaPublic

module type ByLike = module type of By

type serviceWorkerGlobalScope
@bs.val external self: serviceWorkerGlobalScope = "self"

@set external setGlobalDova: (serviceWorkerGlobalScope, module(DovaPublicLike)) => unit = "Dova"
@set external setGlobalBy: (serviceWorkerGlobalScope, module(ByLike)) => unit = "By"

setGlobalDova(self, module(DovaPublic))
setGlobalBy(self, module(By))


%raw("import('/Users/dmitrijkovalenko/dev/Dova/test.js').then(console.log)")

// // executeTest();
