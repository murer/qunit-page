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
  self.pageTestFunction = func;
  self.codeBlocks = [];
  self.readPosition = 0;

  (function initialize() {
    self.codeBlocks.push('page open place holder');

    var currentBlock = nextBlock(self.pageTestFunction);
    while (currentBlock) {
      self.codeBlocks.push(currentBlock);

      currentBlock = nextBlock(self.pageTestFunction);
    }

  })();

  function nextBlock(content) {
    var position = content.indexOf('page.step');
    if (position == -1) return undefined;

    self.pageTestFunction = content.substring(position + 'page.test'.length + 1);

    return new CodeBlock('a');
  }
}

function CodeBlock(content) {

  var self = this;
  self.content = content;

}
