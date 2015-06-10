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
  self.pageTestFunction = func; //FIXME - remove, side effect
  self.codeBlocks = [];
  self.readPosition = 0;

  (function initialize() {
    // page.open place holder
    self.codeBlocks.push(new CodeBlock("page.open('place_holder');"));
    self.pageTestFunction = self.pageTestFunction.substring(self.pageTestFunction.indexOf('page.step'));

    var currentBlock = nextBlock(self.pageTestFunction);
    while (currentBlock) {
      self.codeBlocks.push(currentBlock);

      currentBlock = nextBlock(self.pageTestFunction);
    }

  })();

  function nextBlock(content) {
    var position = content.indexOf('page.step');
    if (position == -1) return undefined;

    var block = ParserUtils.nextBlock(content);

    self.pageTestFunction = self.pageTestFunction.substring(block.content.length);
    self.pageTestFunction = self.pageTestFunction.trim();

    return block;
  }
}

function CodeBlock(content) {

  var self = this;
  self.content = content;

}
