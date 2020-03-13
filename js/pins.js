'use strict';

(function () {

  var BUTTON_MAP_PIN_WIDTH = 50;
  var BUTTON_MAP_PIN_HEIGHT = 70;

  window.mapPinsElements = [];

  var mapPinsElement = document.querySelector('.map__pins');


  window.setPinsActiveCondition = function (elements) {

    var adTemplateElement = document.querySelector('#pin').content;

    var renderAdPin = function (ad) {
      var adElement = adTemplateElement.cloneNode(true);
      var mapPinStyle = 'left:' + (ad.location.x - (BUTTON_MAP_PIN_WIDTH / 2)) + 'px; top: ' + (ad.location.y - BUTTON_MAP_PIN_HEIGHT) + 'px;';
      adElement.querySelector('img').src = ad.author.avatar;
      adElement.querySelector('img').alt = ad.offer.title;
      adElement.querySelector('.map__pin').style.cssText = mapPinStyle;

      return adElement;
    };

    window.createAdPinsFragment = function (adsElements) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adsElements.length; i++) {
        fragment.appendChild(renderAdPin(adsElements[i]));
      }
      mapPinsElement.appendChild(fragment);
    };

    var adsFiveElements = elements.slice(0, 5);
    window.createAdPinsFragment(adsFiveElements);

    window.mapPinsElements = mapPinsElement.querySelectorAll('button:not(.map__pin--main)');

    window.pinPopUp;

    var removePopUpAndEscapeListener = function () {
      window.pinPopUp.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    };


    var onDocumentKeydown = function (evt) {
      window.util.isEscEvent(evt, removePopUpAndEscapeListener);
    };

    var addClickListener = function (i) {
      window.mapPinsElements[i].addEventListener('click', function () {
        if (window.pinPopUp !== undefined) {
          window.pinPopUp.remove();
        }

        window.pinPopUp = window.getInfoAdElement(adsFiveElements[i]).children[0];

        document.querySelector('.map__filters-container').before(window.pinPopUp);
        var mapPopUpCloseElement = document.querySelector('.popup__close');
        mapPopUpCloseElement.addEventListener('click', function () {
          removePopUpAndEscapeListener();
        });
        document.addEventListener('keydown', onDocumentKeydown);
      });
    };


    var addPinsClickListener = function () {
      for (var i = 0; i < adsFiveElements.length; i++) {
        addClickListener(i);
      }
    };
    addPinsClickListener();
  };

})();
