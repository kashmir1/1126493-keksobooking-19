'use strict';

(function () {
  var mocks = [];

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var movePin = function () {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = window.data.mocks[i].location.x;
    pinElement.style.top = window.data.mocks[i].location.y;
    pinElement.querySelector('img').src = window.data.mocks[i].author.avatar;
    pinElement.querySelector('img').alt = window.data.mocks[i].offer.title;
    return pinElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < window.data.OBJECT_QUANTITY; i++) {
    fragment.appendChild(movePin(mocks[i]));
  }

  window.pins = {
    mapPins: mapPins,
    fragment: fragment
  };
})();


