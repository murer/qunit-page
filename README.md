# QUnitPage

QUnitPage JS

## Implementing a test

    (function(t) {
    
    	// qunit module
	    t.module('first module');
	    
	    // you should pass a test function as you do with tradional qunit.
	    // you will receive a page where you can describe test steps.
    	t.pageTest("first test", function(page) {
    	
    		// you want to open the page.
			page.open('page.html');
			
			// first step. You need to pass two arguments.
			// first argument is a array of elements to wait for. 
			// second argument is your step function. 
			// It receives the elements which you were waiting for.
    		page.step([ '#some .css .path' ], function(element) {
	    		element.click();
            });
 		   
		    // You can do more steps, of course.
		    // you can pass a step name if you want as the first argument.
    		page.step('second step', [ '.link', '.element2' ], function(link, textbox) {
	    		textbox.val('abc');
	    		link.click();
		    });
		    
		    // You can do a more complex waitFor passing a function.
		    // this waitFor function will be called until it returns something 'valid in javascript'.
		    // and the return will be the arugment to your step function.
    		page.step('second step', [ '.link', function() {
    			return window.something;
    		} ], function(link, something) {
				something.do();
				link.click();			
		    });
    	});
    })(QUnit);
    
## Live Sample

http://murer.github.com/qunit-page/test/test.html

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>QUnit Page Test</title>
      <link rel="stylesheet" href="../lib/qunit.css">
      <script src="../lib/jquery.js"></script>
      <script src="../lib/qunit.js"></script>
      <script src="../src/qunit-page.js"></script>
      <script src="qunit-page-poc.js"></script>
      <script src="qunit-page-wait-test.js"></script>
      <script src="qunit-page-face-test.js"></script>   
      <script src="qunit-page-face-wait-test.js"></script>
    </head>
    <body>
      <div id="qunit"></div>
      <div id="qunit-fixture"></div>
    </body>
    </html>

## Tests Sample

https://github.com/murer/qunit-page/tree/master/test

## Download

http://murer.github.com/qunit-page/src/qunit-page.js

