(function(t) {

  t.module('Parser');

  t.test('should create a ParserResult', function() {
    var parser = new Parser('');
    t.ok(parser.parse());
  });

  var pageTestInDevelopment = function(page) {

    page.open('panel.html');

    page.step('step1', ['a', 'b'], function(a, b) {
    });

    page.step('step2', ['a', 'b'], function(a, b) {
    });
  }

  t.test('should identity the pageTestFunction', function() {
    var parseResult = new Parser(pageTestInDevelopment).parse();
    t.ok(parseResult.originalPageTestFunction.indexOf('page.open') != -1);
  });

  t.test('should have 3 codeBlocks', function() {
    var parseResult = new Parser(pageTestInDevelopment).parse();
    t.equal(parseResult.codeBlocks.length, 3);
  });

  t.test('should have one page.open and two page.step blocks', function() {
    var parseResult = new Parser(pageTestInDevelopment).parse();
    t.equal(parseResult.codeBlocks[0].content.indexOf('page.open'), 0);
    t.equal(parseResult.codeBlocks[1].content.indexOf('page.step'), 0);
    t.equal(parseResult.codeBlocks[2].content.indexOf('page.step'), 0);
  });

}(QUnit));