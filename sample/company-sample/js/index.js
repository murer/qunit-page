(function($) {

    window.onhashchange = function() {
        var pageToLoad = window.location.hash.substring(1);
        console.log(pageToLoad);
        $.get(pageToLoad + '.html', function(result) {
            $('#content').html(result);
        });
    }

})(jQuery);

function Company(name, identificationNumber) {
    this.name =  name;
    this.identificationNumber = identificationNumber;
}

(function(){
    var companies = [];

    Company.query = function(name, identificationNumber) {
        companies.filter(function(company) {
            if (name && name != company.name) return false;
            if (identificationNumber && identificationNumber != company.identificationNumber) return false;
            return true;
        });
        return companies;
    }

    Company.prototype.save = function() {
        companies.push(this);
    }
})();
