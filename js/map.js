'use strict';

(function () {
  var advMap = document.querySelector('.map');
  var mapPinMain = advMap.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formElements = adForm.querySelectorAll('.ad-form__element');

  var address = document.querySelector('#address');
  var pinCoordinateLeft = parseInt(mapPinMain.style.left, 10);
  var pinCoordinateTop = parseInt(mapPinMain.style.top, 10);


  address.value = (pinCoordinateLeft + window.data.PinsCoordinates.MAIN_PIN_LEFT) + ', ' + (pinCoordinateTop + window.data.PinsCoordinates.MAIN_PIN_TOP);

  // Делаем все элементы формы неактивными
  formElements.forEach(function (input) {
    input.setAttribute('disabled', 'disabled');
  });

  // Функция аткивации окна
  var activateForm = function () {
    advMap.classList.remove('map--faded');
    window.pins.mapPins.appendChild(window.pins.fragment);
    adForm.classList.remove('ad-form--disabled');
    formElements.forEach(function (input) {
      input.removeAttribute('disabled');
      address.setAttribute('readonly', 'readonly');
    });
  };

  // Активация по ЛКМ
  var onPinClick = function (evt) {
    if (evt.which === window.data.ControlsEvents.LEFT_MOUSE_BUTTON) {
      activateForm();
    }
  };

  // Активация по Enter
  var onEnterPress = function (evt) {
    if (evt.key === window.data.ControlsEvents.ENTER_KEY) {
      activateForm();
    }
  };

  mapPinMain.addEventListener('mousedown', onPinClick);
  mapPinMain.addEventListener('keydown', onEnterPress);

  window.adForm = adForm;
})();
