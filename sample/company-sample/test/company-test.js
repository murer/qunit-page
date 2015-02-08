(function(t) {

  t.module('Company CRUD Test');

  t.pageTestInDevelopment("Create and Search", function(page) {

    page.open('/sample/company-sample/index.html');

    page.step('Login', ['#name', '#password', '.login'], function(name, password, loginButton) {
      name.val('andrei');
      password.val('123');
      page.click(loginButton);
    });

  });

})(QUnit);