'use strict';

(function () {
  var getRanbomNumber = function (x, y) {
    return Math.floor(Math.random() * (x - y + 1) + y);
  };

  var arrayRandElement = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getLocationCoordinates = function (x, y) {
    return String(x) + ', ' + String(y);
  };

  window.utils = {
    getRanbomNumber: getRanbomNumber,
    arrayRandElement: arrayRandElement,
    getLocationCoordinates: getLocationCoordinates
  };
})();

