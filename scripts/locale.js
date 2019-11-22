(function() {
  var order = [
    "/scripts/locale/account.js?1236911196000",
    "/scripts/locale/itemflavor.js?1574423440829",
    "/scripts/locale/uistats.js?1543886559503",
  ];
  
  var loadIdx = 0;
  function doLoad() {
    if (loadIdx >= order.length) {
      DiabloCalc.onLocaleLoaded();
    } else {
      var path = order[loadIdx++];
      DC_getScript(path, doLoad);
    }
  }
  doLoad();
})();