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

var createAds = function (obj, qty) {
  for (var i = 0; i <= qty; i++) {
    mocks.push(obj);
  }
  return mocks;
};


var createAdsObj = function () {
  var data = {
    author: {
      avatar: "img/avatars/user0" + getRandomNum(1, 8) + ".png"
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
      x: getRandomNum(1200, 704),
      y: getRandomNum(130, 630),
    }
  };
  return data;
};

// console.log(createAds(data, 8));
console.log(createAdsObj());
// console.log(mocks.push(createAdsObj(), createAdsObj(), createAdsObj()));
// mocks.push(createAdsObj(), createAdsObj(), createAdsObj());
console.log(mocks);

var x = function () {
  for (var i = 0; i < 8; i++) {
    mocks.push(createAdsObj([i]))
  }
  return mocks;
};

console.log(x());

