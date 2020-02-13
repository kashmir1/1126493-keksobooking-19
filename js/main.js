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

// Координаты для вставки метки за вычетом острого конца
var PIN_W_X = 0;
var PIN_W_Y = 1200;
var PIN_H_X = 130;
var PIN_H_Y = 630;
var PIN_TIP_W = 31;
var PIN_TIP_H = 72;

// Функция генерации массива аватарок
var addAvatarNumber = function () {
  for (var i = 1; i <= 8; i++) {
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
  return String(x) + ' ' + String(y);
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
  for (var i = 0; i <= 8 - 1; i++) {
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
        x: getRanbomNumber(PIN_W_X, PIN_W_Y - PIN_TIP_W) + 'px',
        y: getRanbomNumber(PIN_H_X, PIN_H_Y - PIN_TIP_H) + 'px'
      }
    };
    mocks.push(mock);
  }
};
createMock();
// console.log(mocks);

var advMap = document.querySelector('.map');
advMap.classList.remove('map--faded');

var mapPin = document.querySelector('.map__pin');
var avatar = mapPin.querySelector('img');


mapPin.style.left = mocks[0].location.x;
mapPin.style.top = mocks[0].location.y;
avatar.src = mocks[0].author.avatar;
avatar.alt = mocks[0].offer.title;
