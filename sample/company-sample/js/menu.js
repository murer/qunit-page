var menu = {}

menu.active = function(selector) {
  $('.menu li').removeClass('active');
  $('.menu li' + selector).addClass('active');
}
