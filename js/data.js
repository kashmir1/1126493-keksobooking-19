'use strict';

(function () {
  var typesOffer = [
    {
      type: 'palace',
      name: 'Дворец'
    },
    {
      type: 'flat',
      name: 'Квартира'
    },
    {
      type: 'bungalo',
      name: 'Бунгало'
    },
    {
      type: 'house',
      name: 'Дом'
    },
  ];

  var housingTypes = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };
  var pricePerNight = {
    BUNGALO: '0',
    FLAT: '1000',
    HOUSE: '5000',
    PALACE: '10000'
  };

  var checkins = ['12:00', '13:00', '14:00'];
  var features = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PINS_QTY = 8;

  var mocks = [];

  window.createAdsObj = function () {
    return {
      author: {
        avatar: 'img/avatars/user0' + window.utils.getRandomNum(1, 8) + '.png'
      },
      offer: {
        title: 'Good room',
        address: '600, 350',
        price: 10000,
        type: window.utils.getRandomArrayElement(typesOffer),
        rooms: 5,
        guests: 10,
        checkin: window.utils.getRandomArrayElement(checkins),
        checkout: window.utils.getRandomArrayElement(checkins),
        features: window.utils.getRandomArrayElement(features),
        description: 'Best room for you',
        photos: window.utils.getRandomArrayElement(photos)
      },
      location: {
        x: window.utils.getRandomNum(0, 1200) + 'px',
        y: window.utils.getRandomNum(130, 630) + 'px',
      }
    };
  };

  window.mocks = mocks;
  window.pinsQty = PINS_QTY;
  window.housingTypes = housingTypes;
  window.pricePerNight = pricePerNight;
})();
