var message = {}

message.success = function(msg) {
  $('#message').text(msg);
  $('#message').fadeIn();

  setTimeout(function() {
    $('#message').fadeOut();
  }, 3000);
}
