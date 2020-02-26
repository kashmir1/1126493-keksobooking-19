'use strict';

var avatarNumbers = [];
var prices = [1000, 20000, 40000];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5];
var checkinsCheckouts = ['12:00', '13:00', '13:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var OBJECT_QUANTITY = 8;

// Координаты для вставки метки за вычетом острого конца
var PIN_W_X = 0;
var PIN_W_Y = 1200;
var PIN_H_X = 130;
var PIN_H_Y = 630;

var PIN_TAIL_X = 20;
var PIN_TAIL_Y = 40;

var MAIN_PIN_LEFT = 32 / 2;
var MAIN_PIN_TOP = 82;

var LEFT_MOUSE_BUTTON = 1;
var ENTER_KEY = 'Enter';

// Функция генерации массива аватарок
var addAvatarNumber = function () {
  for (var i = 1; i <= OBJECT_QUANTITY; i++) {
    avatarNumbers.push('0' + i + '.png');
  }
};

addAvatarNumber();

// Функция добавления массива
var getData = function (number, array) {
  return array[number];
};

// Функция записи координат
var getLocationCoordinates = function (x, y) {
  return String(x) + ', ' + String(y);
};


// Получаем случайный индекс массива
var arrayRandElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getRanbomNumber = function (x, y) {
  return Math.floor(Math.random() * (x - y + 1) + y);
};

// Создаем пустой моссив моков
var mocks = [];


(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();


// Создаем объекты и записываем в массив


var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var generatePin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('.map__pin').style.left = pin.location.x;
  pinElement.querySelector('.map__pin').style.top = pin.location.y;
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var successHandler = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    fragment.appendChild(generatePin(pins[i]));
  }
  // var result = Array.from(fragment.children);
  mapPins.appendChild(fragment);
  // return result;
};

successHandler(pins);

var advMap = document.querySelector('.map');
var mapPinMain = advMap.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formElements = adForm.querySelectorAll('.ad-form__element');

var address = document.querySelector('#address');
var pinCoordinateLeft = parseInt(mapPinMain.style.left, 10);
var pinCoordinateTop = parseInt(mapPinMain.style.top, 10);


address.value = (pinCoordinateLeft + MAIN_PIN_LEFT) + ', ' + (pinCoordinateTop + MAIN_PIN_TOP);

// Делаем все элементы формы неактивными
formElements.forEach(function (input) {
  input.setAttribute('disabled', 'disabled');
});

// Функция аткивации окна
var activateForm = function () {
  advMap.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  adForm.classList.remove('ad-form--disabled');
  formElements.forEach(function (input) {
    input.removeAttribute('disabled');
  });
};

// Активация по ЛКМ
var onPinClick = function (evt) {
  if (evt.which === LEFT_MOUSE_BUTTON) {
    activateForm();
  }
};

// Активация по Enter
var onEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    activateForm();
  }
};

mapPinMain.addEventListener('mousedown', onPinClick);
mapPinMain.addEventListener('keydown', onEnterPress);

// Валидация заголовка объявления (не в этом задании)
// var titleInput = adForm.querySelector('#title');
//
// titleInput.addEventListener('invalid', function () {
//   if (titleInput.validity.tooShort) {
//     titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
//   } else if (titleInput.validity.tooLong) {
//     titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
//   } else if (titleInput.validity.valueMissing) {
//     titleInput.setCustomValidity('Обязательное поле');
//   } else {
//     titleInput.setCustomValidity('');
//   }
// });

// Валидация и соответствие количества гостей с количеством комнат
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var getRoomValidation = function () {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('Эта комната для одного гостя');
  } else if (roomNumber.value === '2' && capacity.value === '3') {
    capacity.setCustomValidity('Эта комната для одного или двух гостей');
  } else if (roomNumber.value === '2' && capacity.value === '0') {
    capacity.setCustomValidity('Эта комната для одного или двух гостей');
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    capacity.setCustomValidity('Эта комната для одного - трех гостей');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Количество гостей должно быть не менее 100');
  } else {
    capacity.setCustomValidity('');
  }
};

getRoomValidation();

roomNumber.addEventListener('change', getRoomValidation);
capacity.addEventListener('change', getRoomValidation);
