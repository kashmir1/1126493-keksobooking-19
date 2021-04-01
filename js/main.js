'use strict';
// Создаем пустой массив
var adsList = [];
var ADS_COUNT = 8;

// Создаем моки
var adsData = {
  'title': 'строка, заголовок предложения'
};


var createAdsArray = function (array, data) {
  for (var i = 0; i < ADS_COUNT; i++) {
    array.push(data);
  }
}

createAdsArray(adsList, adsData);

console.log(adsList);
