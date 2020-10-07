'use strict';

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

var checkins = ['12:00', '13:00', '14:00'];
var features = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PINS_QTY = 8;


var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNum = function (firstNum, lastNum) {
  var rand = firstNum + Math.random() * (lastNum + 1 - firstNum);
  return Math.floor(rand);
};

var mocks = [];

var createAdsObj = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomNum(1, 8) + '.png'
    },
    offer: {
      title: 'Good room',
      address: '600, 350',
      price: 10000,
      type: getRandomArrayElement(typesOffer),
      rooms: 5,
      guests: 10,
      checkin: getRandomArrayElement(checkins),
      checkout: getRandomArrayElement(checkins),
      features: getRandomArrayElement(features),
      description: 'Best room for you',
      photos: getRandomArrayElement(photos)
    },
    location: {
      x: getRandomNum(0, 1200) + 'px',
      y: getRandomNum(130, 630) + 'px',
    }
  };
};


var createAds = function (qty, array) {
  for (var i = 0; i < qty; i++) {
    array.push(createAdsObj([i]));
  }
  return array;
};

createAds(PINS_QTY, mocks);

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content;
var cardTemplate = document.querySelector('#card')
  .content;

// Рендер пинов
var renderPin = function (pins) {
  var pinElements = pinTemplate.cloneNode(true);

  pinElements.querySelector('img').src = pins.author.avatar;
  pinElements.querySelector('.map__pin').style.left = pins.location.x;
  pinElements.querySelector('.map__pin').style.top = pins.location.y;
  return pinElements;
};

// Рендер попапов
var renderCard = function (card) {
  var cardElements = cardTemplate.cloneNode(true);

  cardElements.querySelector('.popup__title').textContent = card.offer.title;
  cardElements.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElements.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElements.querySelector('.popup__type').textContent = card.offer.type.name;
  cardElements.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для '
    + card.offer.guests + ' гостей';
  cardElements.querySelector('.popup__text--time').textContent = 'Заезд после ' +
    card.offer.checkin + ' выезд до ' + card.offer.checkout;
  cardElements.querySelector('.popup__features').textContent = card.offer.features;
  cardElements.querySelector('.popup__description').textContent = card.offer.description;
  cardElements.querySelector('.popup__photos img').src = card.offer.photos;
  cardElements.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElements;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < mocks.length; i++) {
  fragment.appendChild(renderPin(mocks[i]));
  // fragment.appendChild(renderCard(mocks[i]));
}

mapPins.appendChild(fragment);


// Активируем карту

var mainPin = document.querySelector('.map__pin');
var mapContainer = document.querySelector('.map--faded');

var logMouseButton = function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        mapContainer.classList.remove('map--faded');
        break;
    }
  }
};

// var mapActivateHandler = function () {
//   mapContainer.classList.remove('map--faded');
// };
mainPin.addEventListener('mousedown', logMouseButton);

// mainPin.addEventListener('mousedown', function () {
//   logMouseButton();
// });
