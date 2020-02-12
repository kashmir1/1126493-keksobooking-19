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

// Функция генерации массива аватарок
var addAvatarNumber = function () {
  for (var i = 1; i <= 8; i++) {
    avatarNumbers.push('0' + i);
  }
};

addAvatarNumber();

// Функция добавления массива
var getData = function (number, array) {
  for (var i = 0; i <= number; i++) {
    array[number];
    return array[number];
  }
};

//Функция записи координат
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

console.log(avatarNumbers);

var mock = [
  {
    author: {
      avatar: 'img/avatars/user' + getData(0, avatarNumbers)
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
      x: getRanbomNumber(1, 100),
      y: getRanbomNumber(130, 630)
    }

  }
];

console.log(mock);
