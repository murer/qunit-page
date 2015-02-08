function Company(name, identificationNumber) {
  this.name =  name;
  this.identificationNumber = identificationNumber;
}

(function(){
  var companies = [];

  Company.all = function() {
    return companies;
  }

  Company.query = function(name, identificationNumber) {
    return {
      done: function(cb) {
        asynCall(function() {
          companies.filter(function(company) {
            if (name && name != company.name) return false;
            if (identificationNumber && identificationNumber != company.identificationNumber) return false;
            return true;
          });
          cb(companies);
        }, controlPanel.searchTime);
      }
    }
  }

  Company.prototype.save = function() {
    var self = this;

    return {
      done: function(cb) {
        asynCall(function() {
          companies.push(self);
          cb();
        }, controlPanel.saveTime);
      }
    }
  }
})();