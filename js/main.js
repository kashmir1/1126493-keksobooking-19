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

var mapPinsElement = document.querySelector('.map__pins');

// Рендер пинов
var renderPin = function (pins) {
  var pinElements = pinTemplate.cloneNode(true);
  pinElements.querySelector('img').src = pins.author.avatar;
  pinElements.querySelector('.map__pin').style.left = pins.location.x;
  pinElements.querySelector('.map__pin').style.top = pins.location.y;
  return pinElements;
};

var renderPinsMarkup = function () {
  var pinFragment = document.createDocumentFragment();

  for (var q = 0; q < mocks.length; q++) {
    pinFragment.appendChild(renderPin(mocks[q]));
  }
  mapPins.appendChild(pinFragment);
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

// Активируем карту
var mainPin = document.querySelector('.map__pin, .map__pin--main');
var mapContainer = document.querySelector('.map--faded');
var mainForm = document.querySelector('.ad-form, .ad-form--disabled');
var formElements = mainForm.querySelectorAll('input, select, textarea');


var formDisabled = function (elements) {
  for (var q = 0; q < elements.length; q++) {
    elements[q].setAttribute('disabled', 'disabled');
  }
};

formDisabled(formElements);

var mapPinsElements;

// Обработчкик активациии при нажатии только ЛКМ
var mapActivateDownHandler = function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        mapContainer.classList.remove('map--faded');
        mainForm.classList.remove('ad-form--disabled');
        renderPinsMarkup(mocks);

        mapPinsElements = mapPinsElement.querySelectorAll('[type=button]');

        renderPinsInfo();

        var formEnabled = function (elements) {
          for (var q = 0; q < elements.length; q++) {
            elements[q].removeAttribute('disabled');
          }
        };
        formEnabled(formElements);

        break;
    }
  }
};

// Мы создали функцию RenderPinsInfo в которой цикл идет по длине всех пинов и на каждой итерации
// запускает обработчик AddClickListener
// Данный обработчик активируется при клике на i-pin и аппендит моковые данные по итератору
// После этого мыдобавлям данную функцию в наш обработчик активации карты, чтобы заработало

var renderPinsInfo = function () {
  for (var i = 0; i < mapPinsElements.length; i++) {
    addClickListener(i);
  }
};


var mapPopUp = [];

// Закрытие попапа
var closePopUpHandler = function () {
  mapPopUp[0].remove();
};

// Закрытие попапа по Esc
var closePopupEscHandler = function (evt) {
  if (evt.key === 'Escape') {
    closePopUpHandler();
  }
};

var addClickListener = function (i) {

  mapPinsElements[i].addEventListener('click', function () {
    if (mapPopUp.length !== 0) {
      closePopUpHandler();
    }

    document.querySelector('.map__filters-container').before(renderCard(mocks[i]));
    mapPopUp = document.querySelectorAll('.map__card');

    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopUpHandler);
    window.addEventListener('keydown', closePopupEscHandler);
  });
};


// Обработчик активации при нажатии Eter
var mapActivateEnterHandler = function (evt) {
  if (evt.key === 'Enter') {
    mapContainer.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(fragment);
  }
};

// Обработчик смены координат
var pinMoveHandler = function () {
  adress.setAttribute('value', parseInt(mainPin.style.left, 10) + ', '
    + parseInt(mainPin.style.top, 10));
};

mainPin.addEventListener('mousedown', mapActivateDownHandler);
mainPin.addEventListener('keydown', mapActivateEnterHandler);
mainPin.addEventListener('mousedown', pinMoveHandler);


var adress = document.querySelector('#address');

adress.setAttribute('value', parseInt(mainPin.style.left, 10) + ', '
  + parseInt(mainPin.style.top, 10));

// Валидация
var housingType = document.querySelector('#type');
var price = document.querySelector('#price');
var housingTypeOption = housingType.querySelectorAll('option');

var pricePerType = function () {
  for (var y = 0; y < housingTypeOption.length; y++) {
    if (housingTypeOption[y].selected && housingTypeOption[y].value === housingTypes.BUNGALO) {
      price.setAttribute('placeholder', pricePerNight.BUNGALO);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === housingTypes.FLAT) {
      price.setAttribute('placeholder', pricePerNight.FLAT);
      price.setAttribute('min', pricePerNight.FLAT);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === housingTypes.HOUSE) {
      price.setAttribute('placeholder', pricePerNight.HOUSE);
      price.setAttribute('min', pricePerNight.HOUSE);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === housingTypes.PALACE) {
      price.setAttribute('placeholder', pricePerNight.PALACE);
      price.setAttribute('min', pricePerNight.PALACE);
    }
  }
};

housingType.addEventListener('change', pricePerType);
