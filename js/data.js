'use strict';

// Модуль данных

(function () {
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
  var PinsCoordinates = {
    PIN_WIDTH_X: 0,
    PIN_WIDTH_Y: 1200,
    PIN_HEIGHT_X: 130,
    PIN_HEIGHT_Y: 630,
    PIN_TAIL_X: 20,
    PIN_TAIL_Y: 40,
    MAIN_PIN_LEFT: 32 / 2,
    MAIN_PIN_TOP: 82
  };

  var ControlsEvents = {
    LEFT_MOUSE_BUTTON: 1,
    ENTER_KEY: 'Enter'
  };

  // Создаем пустой моссив моков
  var mocks = [];

  // Создаем объекты и записываем в массив
  var createMock = function () {
    for (var i = 0; i < OBJECT_QUANTITY; i++) {
      mocks[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: 'заголовок предложения',
          address: window.utils.getLocationCoordinates(600, 350),
          price: prices[window.utils.arrayRandElement(prices)],
          type: offerTypes[i],
          rooms: rooms[window.utils.arrayRandElement(rooms)],
          checkin: checkinsCheckouts[window.utils.arrayRandElement(checkinsCheckouts)],
          checkout: checkinsCheckouts[window.utils.arrayRandElement(checkinsCheckouts)],
          features: featuresList[window.utils.arrayRandElement(featuresList)],
          description: 'Описание',
          photos: photosList[window.utils.arrayRandElement(photosList)],
        },

        location: {
          x: window.utils.getRanbomNumber(PinsCoordinates.PIN_WIDTH_X, PinsCoordinates.PIN_WIDTH_Y) - PinsCoordinates.PIN_TAIL_X + 'px',
          y: window.utils.getRanbomNumber(PinsCoordinates.PIN_HEIGHT_X, PinsCoordinates.PIN_HEIGHT_Y) - PinsCoordinates.PIN_TAIL_Y + 'px'
        }
      };
      // mocks.push(mock);
    }
    return mocks;
  };
  createMock();

  window.data = {
    OBJECT_QUANTITY: OBJECT_QUANTITY,
    PinsCoordinates: PinsCoordinates,
    ControlsEvents: ControlsEvents,
    mocks: mocks,
    createMock: createMock()
  };

})();
