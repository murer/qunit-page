(function(t) {

  t.module('Parser: page.step blocks');

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
    t.equal(parseResult.codeBlocks.length, 3);
    t.equal(parseResult.codeBlocks[0].content.indexOf('page.open'), 0);
    t.equal(parseResult.codeBlocks[1].content.indexOf('page.step'), 0);
    t.equal(parseResult.codeBlocks[2].content.indexOf('page.step'), 0);
  });

}(QUnit));

(function(t) {

  t.module('Parser: unknown blocks');

  var pageTestInDevelopment = function(page) {

    page.open('panel.html');

    page.step('step1', ['a', 'b'], function(a, b) {
    });

    function functionCall() {

    }

    var a = 'a';
    functionCall(a);

    page.step('step2', ['a', 'b'], function(a, b) {
    });

    var b = 10;
  }

  t.test('should identify unknown blocks', function() {
    var parseResult = new Parser(pageTestInDevelopment).parse();
    t.equal(parseResult.codeBlocks[0].content.indexOf('page.open'), 0);
    t.equal(parseResult.codeBlocks[1].content.indexOf('page.step'), 0);
    t.equal(parseResult.codeBlocks[2].content.indexOf('function'), 0);
    t.equal(parseResult.codeBlocks[3].content.indexOf('page.step'), 0);
    t.equal(parseResult.codeBlocks[4].content, 'var b = 10;');
  });

}(QUnit));