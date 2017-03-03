# [QUnit Page](http://qunitpage.org)

A QUnit extension that allows you to easily write clean UI tests.

[![Build Status](https://snap-ci.com/murer/qunit-page/branch/master/build_image)](https://snap-ci.com/murer/qunit-page/branch/master)

https://www.npmjs.com/package/qunit-page

## Features

- **Avoid flaky tests** - QUnit Page test structure induces you to think considering the user perspective.
Your test is structured in wait for/do something because it helps you to avoid false negatives.

- **Write your test in javascript** - The browser knows only one language: JavaScript. So, why should we write our test in another language? When we write UI test in another language, we are introducing unnecessary layers. This layer makes it extremely hard to debug false negatives.

- **Framework freedom** - UI tests are created from the final user perspective. An user doesn't know how the app was made, so why an UI test should know?

- **Browser freedom** - You need to run tests in your CI tool, probably using a headless browser, like PhantomJS. But sometimes things go wrong... and you want to be free to choose your favorite browser in order to debug it.

## Do you want to contribute?

All submissions are welcome. To submit a change, fork this repo, commit your changes, and send us a pull request.
