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

  function substringBefore(value, match) {
    var posInit = value.indexOf(match);
    return value.substring(0, posInit);
  }

  function substringAfter(value, match) {
    var posInit = value.indexOf(match);
    return value.substring(posInit + match.length);
  }

  function newPageStepBlock(value) {
    var valueAfterParentheses = substringAfter(value, 'page.step(');
    var name = substringBefore(valueAfterParentheses, ',');
    var blockContent = valueAfterParentheses.substring(0, nextCloseParentheses(valueAfterParentheses));
    var codeBlockAsString = 'page.step(' + blockContent + ');';

    return new CodeBlock(name, codeBlockAsString);
  }

  function newUnknownBlock(value) {
    var endPosition = value.indexOf('page.step');

    if (endPosition == -1) {
      endPosition = value.indexOf('}');
    }

    var codeBlockAsString = value.substring(0, endPosition);
    return new CodeBlock(undefined, codeBlockAsString);
  }

  function nextBlock(value) {
    if (value.indexOf('}') == 0) {
      return undefined;
    } else if (value.indexOf('page.step') == 0) {
      return newPageStepBlock(value);
    } else {
      return newUnknownBlock(value);
    }
  }

  function replaceAll(value, from, to) {
    while (value.indexOf(from) >= 0) {
      value = value.replace(from, to);
    }

    return value;
  }

  ParserUtils.nextCloseParentheses = nextCloseParentheses;
  ParserUtils.substringAfter = substringAfter;
  ParserUtils.nextBlock = nextBlock;
  ParserUtils.replaceAll = replaceAll;
})();