(function($) {

    window.onhashchange = function() {
        var pageToLoad = window.location.hash.substring(1);
        if (!pageToLoad) {
            document.location.hash = '#login';
            return;
        }

        $.get(pageToLoad + '.html', function(result) {
            $('#content').html(result);
        });
    }

    window.onhashchange();
})(jQuery);
