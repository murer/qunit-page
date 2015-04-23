(function(t) {

  t.module('Company CRUD Test');

  t.pageTest("Create and Search", function(page) {

    page.open('/sample/company-sample/index.html');

    page.step('Go to create page', ['a[href=#create]'], function(createLink) {
      page.click(createLink);
    });

    page.step('Create user', ['#name', '#number', '#save'], function(name, number, saveButton) {
      name.val('Andrei Tognolo');
      number.val('123');
      page.click(saveButton);
    });

    // Note: we don't use the h1, but we need to wait it to guarantee that the save process is done
    page.step('Search', ['h1:contains(Search)', '#name', 'button#search'], function(title, name, searchButton) {
      name.val('Andrei Tognolo');
      page.click(searchButton);
    });

    // Note: we don't need to assert anything here, because if Andrei is not present it would be stuck
    page.step('Check for table element', ['tr td:contains(Andrei Tognolo)'], function(td) {

    });
  });

})(QUnit);