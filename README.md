# Sidenav.js

[![Join the chat at https://gitter.im/ubenzer/sidenavjs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ubenzer/sidenavjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![devDependency Status](https://david-dm.org/ubenzer/sidenavjs/dev-status.svg)](https://david-dm.org/ubenzer/sidenavjs#info=devDependencies)

No dependencies! Only *4K* when minified and gzipped!

Sidenav.js is a JavaScript library that enables users add sidebars to their web site that behaves
like a native side navigation component of a mobile phone application.

![Sidenav Screencast Gif](sidenav-preview.gif)

[Hi-res Video](https://www.youtube.com/watch?v=pLeKw-mBVyw&)

This library tries to emulate the exact same behavior of Android's sidenav in pure JavaScript to enable users
to create native-like web applications. Open Google Play Store and swipe your finger from the left of the
screen. This library tries to provide the exact same behaviour.

## Demo
To see a live demo click [here](https://rawgit.com/ubenzer/sidenavjs/master/demo/index.html) or scan the barcode at the end of the page. Don't forget to try it on your mobile phone too! Swipe your finger from the left of the screen towards right, just like you Open a sidenav in Android!

## Features
1. Mobile first. Means: The library is small and robust, optimized for fluditly and framerate.
2. Multi-finger handled. Means: We won't confuse your fingers and throw bunch of exceptions if you
touch with more then one finger.
3. You can open/close sidenav programmatically. (By binding it to a button.)

## How to use
1. Include `sidenav.min.js` and `sidenav.min.css" in your proejct.
  ```html
  <link rel="stylesheet" href="sidenav.min.css">
  <script src="sidenav.min.js"></script>
  ```

2. Modify your html structure to conform to following:
  ```html
  <body>
    <div id="backdrop"><!-- If you want to put something into backdrop for some weird reason put here, otherwise   leave this empty. --></div>
    <div id="sidenav">
      Everything you want to be in sidenav goes here
    </div>
    <div id="content">
      All of the actual page content goes here
    </div>
    <script src="../dist/sidenav.min.js"></script>
    <script src="demo.js"></script>
  </body>
  ```

3. Initialize your sidenav like the following. As long as you provide single DOM element for each
configuration item, we don't care if you select them by id or anything else.
  ```javascript
  var sidenav = new Sidenav({
    content: document.getElementById("content"),
    sidenav: document.getElementById("sidenav"),
    backdrop: document.getElementById("backdrop")
  });
  ```
4. If you want to open/close sidenav programmatically (say, you have a hamburger menu button) attach
functionality like this:
  ```javascript
  document.getElementById("menu-toggle").addEventListener("click", function() {
    sidenav.open(); // or sidenav.close
  });
  ```

  `open()` and `close()` returns promise. This promise will be resolved once animations are complete
  and sidenav is fully opened/closed. So something like this will work:
  ```javascript
  document.getElementById("menu-toggle").addEventListener("click", function() {
    sidenav.open().then(function() { console.log("Hey! Sidenav is now open!"); });
  });
  ```

5. Profit!

## Setting up development environment
1. Fork the project.
2. Run `npm i` in project root.
2. Create a branch with a meaningful name.
3. Develop something.
4. Make a pull request

**To run tests run `npm test`.**
**To create a dist build run `gulp dist`**

## Contributing
Just open a PR and open a ticket.

## LICENSE
MIT

## TODO List
If you complete one of these and open a PR you are more than welcome! There are a lot of things, really.

1. Add tests, make overall test structure better.
2. Add better documentation
3. Publish on bower
4. Create a better demo
5. Setup a web site
6. Use travis as CI

## Credits
Partially inspired by [Slideout](https://github.com/Mango/slideout).

## Your barcode to the demo
![Barcode to Demo](demo/demoqr.jpg)
