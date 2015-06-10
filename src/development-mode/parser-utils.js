var ParserUtils = {};

(function() {
   function nextCloseParentheses(value) {
    var parenthesesToClose = 1;

    for (var i = 0; i < value.length; i++) {
      if (value[i] == '(') {
        parenthesesToClose++;

      } else if (value[i] == ')') {
        parenthesesToClose--;

        if (parenthesesToClose == 0) {
          return i;
        }
      }
    }

    throw 'ThereIsNoClosingParentheses';
  }

  function substringAfter(value, match) {
    var posInit = value.indexOf(match);
    return value.substring(posInit + match.length);
  }

  function nextBlock(value) {
    value = value.trim();

    var valueAfterParentheses = substringAfter(value, 'page.step(');
    var blockContent = valueAfterParentheses.substring(0, nextCloseParentheses(valueAfterParentheses));
    var codeBlockAsString = 'page.step(' + blockContent + ');';
    return new CodeBlock(codeBlockAsString);
  }

  ParserUtils.nextCloseParentheses = nextCloseParentheses;
  ParserUtils.substringAfter = substringAfter;
  ParserUtils.nextBlock = nextBlock;
})();