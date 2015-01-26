var developer = {};

developer.fill = function() {
  if (window.location.hash == "#create") {
    $('#name').val('Alline - ' + new Date().getTime());
    $('#number').val('Lindooona - ' + new Date().getTime());
  }
}

$(document).dblclick(function() {
  developer.fill();
  $('input').first().focus();
});