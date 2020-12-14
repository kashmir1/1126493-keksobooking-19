'use strict';
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

  for (var q = 0; q < window.mocks.length; q++) {
    pinFragment.appendChild(renderPin(window.mocks[q]));
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
        renderPinsMarkup(window.mocks);

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

    document.querySelector('.map__filters-container').before(renderCard(window.mocks[i]));
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

var calculatePricePerType = function () {
  for (var y = 0; y < housingTypeOption.length; y++) {
    if (housingTypeOption[y].selected && housingTypeOption[y].value === window.housingTypes.BUNGALO) {
      price.setAttribute('placeholder', window.pricePerNight.BUNGALO);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === window.housingTypes.FLAT) {
      price.setAttribute('placeholder', window.pricePerNight.FLAT);
      price.setAttribute('min', window.pricePerNight.FLAT);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === window.housingTypes.HOUSE) {
      price.setAttribute('placeholder', window.pricePerNight.HOUSE);
      price.setAttribute('min', window.pricePerNight.HOUSE);
    } else if (housingTypeOption[y].selected && housingTypeOption[y].value === window.housingTypes.PALACE) {
      price.setAttribute('placeholder', window.pricePerNight.PALACE);
      price.setAttribute('min', window.pricePerNight.PALACE);
    }
  }
};

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var timeInList = timeIn.querySelectorAll('option');
var timeOutList = timeOut.querySelectorAll('option');


var calculateInTime = function () {
  for (var u = 0; u < timeInList.length; u++) {
    timeOutList[u].selected = timeInList[u].selected;
  }
};

var calculateOutTime = function () {
  for (var u = 0; u < timeInList.length; u++) {
    timeInList[u].selected = timeOutList[u].selected;
  }
};

timeIn.addEventListener('change', calculateInTime);
timeOut.addEventListener('change', calculateOutTime);

housingType.addEventListener('change', calculatePricePerType);
