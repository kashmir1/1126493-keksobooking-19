'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;

  // var fragment = document.createDocumentFragment();

  var generatePin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('.map__pin').style.left = pin.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    return pinElement;
  };

  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.OBJECT_QUANTITY; i++) {
      fragment.appendChild(generatePin(pins[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.load(successHandler);

  window.userpins = {
    mapPins: mapPins,
  };
})();
