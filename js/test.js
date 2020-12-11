var btns = document.querySelectorAll('.btn');
var hide = document.querySelectorAll('.hide');


var hideAll = function () {
  for (var i = 0; i < hide.length; i++) {
    hide[i].classList.add('hide');
    btns[i].classList.remove('hide');
  }
};


var hideOpenHandler = function (btn, hidden) {
  btn.addEventListener('click', function () {
    hideAll();
    hidden.classList.remove('hide');
    btn.classList.add('hide');
  });
};


for (var q = 0; q < btns.length; q++) {
  var btn = btns[q];
  var hidden = hide[q];
  hideOpenHandler(btn, hidden);
}

