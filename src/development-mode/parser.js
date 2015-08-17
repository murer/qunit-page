function Parser(func) {

  var func = func.toString();

  this.parse = function() {
    return new ParserResult(func);
  }
}

function ParserResult(func) {

  var self = this;
  self.pageTestName = undefined;
  self.originalPageTestFunction = func;
  self.codeBlocks = [];
  self.readPosition = 0;

  (function initialize() {
    var pageTestFunction = self.originalPageTestFunction;

    // FIXME - page.open place holder
    self.codeBlocks.push(new CodeBlock(undefined, "page.open('panel.html');"));
    pageTestFunction = pageTestFunction.substring(pageTestFunction.indexOf('page.step'));

    var currentBlock = nextBlock(pageTestFunction);
    while (currentBlock) {
      self.codeBlocks.push(currentBlock);
      pageTestFunction = pageTestFunction.substring(currentBlock.content.length).trim();

      currentBlock = nextBlock(pageTestFunction);
    }

  })();

  function nextBlock(content) {
    return ParserUtils.nextBlock(content);
  }
}

function CodeBlock(name, content) {

  var self = this;

  if (name) {
    name = ParserUtils.replaceAll(name, "'", '');
    name = ParserUtils.replaceAll(name, '"', '');
    self.name = name;
  }

  self.content = content.trim();
}
