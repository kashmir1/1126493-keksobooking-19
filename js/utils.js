'use strict';

(function () {

  window.utils = {
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getRandomNum: function (firstNum, lastNum) {
      var rand = firstNum + Math.random() * (lastNum + 1 - firstNum);
      return Math.floor(rand);
    }
  };
})();
