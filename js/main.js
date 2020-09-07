'use strict';

var mocks = [];

var createAds = function (obj, qty) {
  for (var i = 0; i <= qty; i++) {
    mocks.push(obj);
  }

  return mocks;
};

var data = {
  name: 'oleg',
  year: 16
};



