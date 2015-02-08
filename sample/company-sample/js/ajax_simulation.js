function asynCall(f, timeout) {
  timeout = timeout || 100
  loading.show();
  setTimeout(function() {
    f();
    loading.hide();
  }, timeout);
}