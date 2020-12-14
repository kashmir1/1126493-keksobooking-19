'use strict';

(function () {
  window.createAds = function (qty, array) {
    for (var i = 0; i < qty; i++) {
      array.push(window.createAdsObj([i]));
    }
    return array;
  };

  window.createAds(window.pinsQty, window.mocks);
})();
