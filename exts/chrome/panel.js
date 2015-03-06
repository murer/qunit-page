(function($) {
	
	$(window).ready(function() {
		$("#panel form").submit(function() {
			var iframe = $('#result iframe');
			iframe.attr('src', 'result.html')
		})
	})
	
})(jQuery)