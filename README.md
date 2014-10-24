# QUnit Page

An QUnit extension that allows you to easily write clean UI tests.

[![Build Status](https://travis-ci.org/murer/qunit-page.png)](https://travis-ci.org/murer/qunit-page)

## Features

- Centered in user steps (help you to avoid false negatives)
- Write your code in javascript (help you to debbug any false negative)
- No browser restriction (ex: Chrome, Firefox, PhantomJS)

You can see here a more detailed explanation why you should care about these features.
>>>>>>> gh-pages

## Implementing a test

	(function(t) {
	
		// qunit module
		t.module('first module');
	
		// you should pass a test function as you do with traditional qunit.
		// you will receive a page where you can describe test steps.
		t.pageTest("first test", function(page) {
	
			// you want to open the page.
			page.open('page.html');
	
			// first step. You need to pass three arguments.
			// first argument is a step name.
			// second argument is a array of elements to wait for.
			// third argument is your step function.
			// It receives the elements which you were waiting for (same order).
			page.step('first step', [ '#some .css .path' ], function(element) {
				element.click();
			});
	
			// You can do more steps, of course.
			page.step('second step', [ '.link', '.element2' ], function(link, textbox) {
				textbox.val('abc');
				link.click();
			});
	
			// You can do a more complex waitFor passing a function.
			// this waitFor function will be called until it returns something
			// 'valid in javascript'.
			// and the return will be the arugment to your step function.
			page.step('second step', [ '.link', function() {
				return window.something;
			} ], function(link, something) {
				something.doSomething();
				link.click();
			});
	
		});
	})(QUnit);


    
### Bad Things

We've decided to remove it for easier experience.
So we no longer wait for a global javascript variable called 'ready'.

~~Same origin policy applies. You need to put test.html at the same domain of the page you want to test.
  
  
When you 'open' any page, we always wait for global 'javascript valid ready' to continue.
It means you need to do something like that in the page which you want to test:~~

    ~~$(window).ready(function() {~~
    	~~ready = true~~
    ~~});~~ 
         
    
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

## QUnit CSS

QUnit css make `#qunit-fixture` invisible. If you want see your pages you need to change like this:

    #qunit-fixture {
    	position: absolute;
    	width: 1200px;
    	height: 800px;
     }


## More Tests

https://github.com/murer/qunit-page/tree/master/test

## Download

http://murer.github.com/qunit-page/src/qunit-page.js
