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
    self.codeBlocks.push(new CodeBlock("page.open('place_holder');"));
    pageTestFunction = pageTestFunction.substring(pageTestFunction.indexOf('page.step'));

    var currentBlock = nextBlock(pageTestFunction);
    while (currentBlock) {
      self.codeBlocks.push(currentBlock);
      pageTestFunction = pageTestFunction.substring(currentBlock.content.length).trim();

      currentBlock = nextBlock(pageTestFunction);
    }

  })();

  function nextBlock(content) {
    var position = content.indexOf('page.step');
    if (position == -1) return undefined;

    return ParserUtils.nextBlock(content);
  }
}

function CodeBlock(content) {

  var self = this;
  self.content = content;

}
