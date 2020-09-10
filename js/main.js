'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var features = ['wi-fi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNum = function (firstNum, lastNum) {
  var rand = firstNum + Math.random() * (lastNum + 1 - firstNum);
  return Math.floor(rand);
};

var mocks = [];

var createAdsObj = function () {
  var data = {
    author: {
      avatar: 'img/avatars/user0' + getRandomNum(1, 8) + '.png'
    },
    offer: {
      title: 'Good room',
      address: '600, 350',
      price: 10000,
      type: getRandomArrayElement(types),
      rooms: 5,
      guests: 10,
      checkin: getRandomArrayElement(checkins),
      checkout: getRandomArrayElement(checkins),
      features: getRandomArrayElement(features),
      description: 'Best room for you',
      photos: getRandomArrayElement(photos)
    },
    location: {
      x: getRandomNum(1200, 704) + 'px',
      y: getRandomNum(130, 630) + 'px',
    }
  };
  return data;
};


var createAds = function (qty, array) {
  for (var i = 0; i < qty; i++) {
    array.push(createAdsObj([i]));
  }
  return array;
};

createAds(8, mocks);

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content;
  // .querySelector('.map__pin');


var renderPins = function (pins) {
  var pinElements = pinTemplate.cloneNode(true);

  pinElements.querySelector('img').src = pins.author.avatar;
  pinElements.querySelector('.map__pin').style.left = pins.location.x;
  pinElements.querySelector('.map__pin').style.top = pins.location.y;
  return pinElements;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < mocks.length; i++) {
  fragment.appendChild(renderPins(mocks[i]));
}

mapPins.appendChild(fragment);


