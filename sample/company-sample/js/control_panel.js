var controlPanel = {}

controlPanel.everythingOk = function() {
  this.searchTime = 200;
  this.saveTime = 100;
  this.printValues();
}

controlPanel.wrongDelay = function() {
  this.searchTime = 100;
  this.saveTime = 1000;
  this.printValues();
}

controlPanel.save = function() {
  this.searchTime = $('#search-time').val();
  this.saveTime = $('#save-time').val();
}

controlPanel.printValues = function() {
  $('#search-time').val(controlPanel.searchTime);
  $('#save-time').val(controlPanel.saveTime);
}

$(document).ready(function() {
  controlPanel.everythingOk();

  $.get('control_panel.html', function(result) {
    $('#control-panel').html(result);
  });
});
