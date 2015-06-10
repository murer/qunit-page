(function(t) {

  t.module('ParserUtils: nextCloseParentheses');

  t.test('should raise an exception if there is no closing parentheses', function() {
    try {
      ParserUtils.nextCloseParentheses('a b c');
      t.ok(false);
    } catch (e) {
      t.ok(e.toString().indexOf('ThereIsNoClosingParentheses') >= 0);
    }
  });

  t.test('should return 0 when the value is exactly a closing parentheses', function() {
    t.equal(ParserUtils.nextCloseParentheses(')'), 0);
  });

  t.test('should return ) position when there is only when closing parentheses', function() {
    t.equal(ParserUtils.nextCloseParentheses('0123)5678'), 4);
  });

  t.test('should return the correct ) position when there more than one closing parentheses', function() {
    t.equal(ParserUtils.nextCloseParentheses('012(45)7)9()'), 8);
  });
}(QUnit));

(function(t) {

  t.module('ParserUtils: substringAfter');

  t.test('should return what remains after the first match', function() {
    t.equal(ParserUtils.substringAfter('abbcbbd', 'bb'), 'cbbd');
  });
})(QUnit);

(function(t) {

  t.module('ParserUtils: nextBlock');

  var block1 =  "   page.step('step1', ['a', 'b'], function(a, b) { });";
  var block2 =  "   page.step('step2', ['a', 'b'], function(a, b) { });";
  var bothBlocks = block1 + block2;

  t.test('should start with page.step', function() {
    var codeBlock = ParserUtils.nextBlock(bothBlocks.trim());
    t.equal(codeBlock.content.indexOf('page.step'), 0);
  });

  t.test('should be only the first block', function() {
    var codeBlock = ParserUtils.nextBlock(bothBlocks.trim());
    t.equal(codeBlock.content, block1.trim());
  });
})(QUnit);