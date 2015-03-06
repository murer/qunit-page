(function($) {
	
	QUnit.config.autostart = false;
	
	function exec() {
		var code = $('#panel .editor', parent.document).val()
		eval(code)
		QUnit.start();
	}
	
	$(window).ready(function() {
		exec();
	})
	
})(jQuery)