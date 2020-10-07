window['nitroAds'].createAd('left-banner', {
  "floor": 0.05,
  "refreshLimit": 10,
  "refreshTime": 90,
  "renderVisibleOnly": false,
  "refreshVisibleOnly": true,
  "sizes": [[300, 250], [160, 600], [300, 600]],
  "report": {
    "enabled": true,
    "wording": "Report Ad",
    "position": "bottom-right"
  }
});
window['nitroAds'].createAd('right-banner', {
  "floor": 0.05,
  "refreshLimit": 10,
  "refreshTime": 90,
  "renderVisibleOnly": false,
  "refreshVisibleOnly": true,
  "sizes": [[300, 250], [160, 600], [300, 600]],
  "report": {
    "enabled": true,
    "wording": "Report Ad",
    "position": "bottom-right"
  }
});

['tab-buildinfo-ads', 'tab-equipment-ads', 'tab-paragon-ads', 'tab-skills-ads', 'tab-import-ads'].forEach(function(id) {
  window['nitroAds'].createAd(id, {
    "refreshLimit": 10,
    "refreshTime": 90,
    "renderVisibleOnly": true,
    "refreshVisibleOnly": true,
    "sizes": [["300", "250"], ["320", "50"]],
    "report": {
      "enabled": true,
      "wording": "Report Ad",
      "position": "bottom-right"
    }
  });
});
