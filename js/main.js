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
var PIN_TIP_W = 50 / 2;
var PIN_TIP_H = 70;

var MAIN_PIN_LEFT = 32 / 2;
var MAIN_PIN_TOP = 82;

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

// Создаем объекты и записываем в массив
var createMock = function () {
  for (var i = 0; i < OBJECT_QUANTITY; i++) {
    var mock = {
      author: {
        avatar: 'img/avatars/user' + getData(i, avatarNumbers)
      },

      offer: {
        title: 'заголовок предложения',
        address: getLocationCoordinates(600, 350),
        price: prices[arrayRandElement(prices)],
        type: getData(3, offerTypes),
        rooms: rooms[arrayRandElement(rooms)],
        checkin: checkinsCheckouts[arrayRandElement(checkinsCheckouts)],
        checkout: checkinsCheckouts[arrayRandElement(checkinsCheckouts)],
        features: featuresList[arrayRandElement(featuresList)],
        description: 'Описание',
        photos: photosList[arrayRandElement(photosList)],
      },

      location: {
        x: getRanbomNumber(PIN_W_X, PIN_W_Y + PIN_TIP_W) + 'px',
        y: getRanbomNumber(PIN_H_X, PIN_H_Y + PIN_TIP_H) + 'px'
      }
    };
    mocks.push(mock);
  }
};
createMock();

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var movePin = function () {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = mocks[i].location.x;
  pinElement.style.top = mocks[i].location.y;
  pinElement.querySelector('img').src = mocks[i].author.avatar;
  pinElement.querySelector('img').alt = mocks[i].offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < OBJECT_QUANTITY; i++) {
  fragment.appendChild(movePin(mocks[i]));
}

var advMap = document.querySelector('.map');
var mapPinMain = advMap.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formElements = adForm.querySelectorAll('.ad-form__element');

var address = document.querySelector('#address');
var pinCoordinateLeft = parseInt(mapPinMain.style.left, 10);
var pinCoordinateTop = parseInt(mapPinMain.style.top, 10);


// address.value = (pinCoordinateLeft + ', ' + pinCoordinateTop);
address.value = (pinCoordinateLeft + MAIN_PIN_LEFT) + ', ' + (pinCoordinateTop + MAIN_PIN_TOP);

// Делаем все элементы формы неактивными
formElements.forEach(function (input) {
  input.setAttribute('disabled', 'disabled');
});


var onPinClick = function () {
  document.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      advMap.classList.remove('map--faded');
      mapPins.appendChild(fragment);
      adForm.classList.remove('ad-form--disabled');
      formElements.forEach(function (input) {
        input.removeAttribute('disabled');
      });
    }
  });
};


mapPinMain.addEventListener('mousedown', onPinClick);


