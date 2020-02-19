'use strict';

(function () {
  var titleInput = window.adForm.querySelector('#title');

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  // Валидация и соответствие количества гостей с количеством комнат
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var getRoomValidation = function () {
    if (roomNumber.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('Эта комната для одного гостя');
    } else if (roomNumber.value === '2' && capacity.value === '3') {
      capacity.setCustomValidity('Эта комната для одного или двух гостей');
    } else if (roomNumber.value === '2' && capacity.value === '0') {
      capacity.setCustomValidity('Эта комната для одного или двух гостей');
    } else if (roomNumber.value === '3' && capacity.value === '0') {
      capacity.setCustomValidity('Эта комната для одного - трех гостей');
    } else if (roomNumber.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Количество гостей должно быть не менее 100');
    } else {
      capacity.setCustomValidity('');
    }
  };

  getRoomValidation();

  roomNumber.addEventListener('change', getRoomValidation);
  capacity.addEventListener('change', getRoomValidation);


})();
