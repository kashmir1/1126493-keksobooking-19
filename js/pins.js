'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var fragment = document.createDocumentFragment();

  var generatePin = function () {
    for (var i = 0; i < window.data.OBJECT_QUANTITY; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = window.data.mocks[i].location.x;
      pinElement.style.top = window.data.mocks[i].location.y;
      pinElement.querySelector('img').src = window.data.mocks[i].author.avatar;
      pinElement.querySelector('img').alt = window.data.mocks[i].offer.title;
      fragment.appendChild(pinElement);
    }
  };

  window.backend.load(generatePin);

  window.pins = {
    mapPins: mapPins,
    fragment: fragment
  };
})();


