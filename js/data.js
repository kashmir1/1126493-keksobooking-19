'use strict';

// Модуль данных

(function () {
  var avatarNumbers = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];
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
  var pinsCoordinates = {
    PIN_W_X: 0,
    PIN_W_Y: 1200,
    PIN_H_X: 130,
    PIN_H_Y: 630,
    PIN_TAIL_X: 20,
    PIN_TAIL_Y: 40,
    MAIN_PIN_LEFT: 32 / 2,
    MAIN_PIN_TOP: 82
  };

  var controlsEvents = {
    LEFT_MOUSE_BUTTON: 1,
    ENTER_KEY: 'Enter'
  };

  // Создаем пустой моссив моков
  var mocks = [];

  // Создаем объекты и записываем в массив
  var createMock = function () {
    for (var i = 0; i < OBJECT_QUANTITY; i++) {
      var mock = {
        author: {
          avatar: avatarNumbers[i]
        },

        offer: {
          title: 'заголовок предложения',
          address: window.util.getLocationCoordinates(600, 350),
          price: prices[window.util.arrayRandElement(prices)],
          type: offerTypes[i],
          rooms: rooms[window.util.arrayRandElement(rooms)],
          checkin: checkinsCheckouts[window.util.arrayRandElement(checkinsCheckouts)],
          checkout: checkinsCheckouts[window.util.arrayRandElement(checkinsCheckouts)],
          features: featuresList[window.util.arrayRandElement(featuresList)],
          description: 'Описание',
          photos: photosList[window.util.arrayRandElement(photosList)],
        },

        location: {
          x: window.util.getRanbomNumber(pinsCoordinates.PIN_W_X, pinsCoordinates.PIN_W_Y) - pinsCoordinates.PIN_TAIL_X + 'px',
          y: window.util.getRanbomNumber(pinsCoordinates.PIN_H_X, pinsCoordinates.PIN_H_Y) - pinsCoordinates.PIN_TAIL_Y + 'px'
        }
      };
      mocks.push(mock);
    }
    return mocks;
  };
  createMock();

  window.data = {
    OBJECT_QUANTITY: OBJECT_QUANTITY,
    pinsCoordinates: pinsCoordinates,
    controlsEvents: controlsEvents,
    mocks: mocks
  };

})();
