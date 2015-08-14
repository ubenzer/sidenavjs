"use strict";

module.exports = Sidenav;

var doc = window.document;
var html = doc.documentElement;

require("es6-promise").polyfill(); // Shim for browsers that does not support Promise natively.

function Sidenav(options) {
  options = options || {};

  this.extraClosePixels = options.extraClosePixels || 30;
  this.width = options.width || 350;
  this.sidenavOpacity = options.sidenavOpacity || 0.5;

  this.isBusy = false; // Is there a progress? Loading or closing?
  this.isOpened = false;
  this.currentOpacity = 0;
  this.currentWidth = 0;

  // Sets panel
  this.sidenav = options.sidenav;
  this.backdrop = options.backdrop;
  this.content = options.content;

  // Sets classnames
  this.content.classList.add("sn-content");
  this.sidenav.classList.add("sn-sidenav");
  setTransformX(this.sidenav, (-1 * this.width) - this.extraClosePixels);
  this.backdrop.classList.add("sn-backdrop");

  // Sets events
  this.initEvents();
}

Sidenav.prototype.open = function() {
  var self = this;

  if (self.isBusy) { return Promise.reject(); }
  self.isBusy = true;

  html.classList.add("sn-visible");

  var promise = this.showHideSidebarBackdrop(true);
  return promise.then(function() {
    self.isBusy = false;
    self.isOpened = true;
  });
};

Sidenav.prototype.close = function() {
  var self = this;

  if (self.isBusy) { return Promise.reject(); }
  self.isBusy = true;

  var promise = this.showHideSidebarBackdrop(false);
  return promise
    .then(function() {
      self.isBusy = false;
      self.isOpened = false;
      html.classList.remove("sn-visible");
    });
};

Sidenav.prototype.expandTo = function(px) {
  var self = this;

  px = Math.min(px, self.width);
  var opacity = self.sidenavOpacity * px / self.width;

  html.classList.add("sn-visible");

  setTransformX(self.sidenav, px - self.width);
  self.backdrop.style.opacity = opacity;
  self.currentOpacity = opacity;
  self.currentWidth = px;
};

Sidenav.prototype.showHideSidebarBackdrop = function(show) {
  var self = this;

  var promise = new Promise(function(resolve) {
    var duration = 300;
    var startTime = null;
    requestAnimationFrame(animate);

    function animate(time) {
      var timePassed = 0;
      if (startTime === null) {
        startTime = time;
      } else {
        timePassed = Math.min((time - startTime), duration);
      }

      var targetOpacity = null;
      var targetTransform = null;
      if (show) {
        targetOpacity = easeOutQuad(timePassed, self.currentOpacity, self.sidenavOpacity - self.currentOpacity, duration);
        targetTransform = easeOutQuad(timePassed, self.currentWidth, self.width - self.currentWidth, duration);
      } else {
        targetOpacity = self.currentOpacity - easeOutQuad(timePassed, 0, self.currentOpacity, duration);
        targetTransform = self.currentWidth - easeOutQuad(timePassed, 0, self.currentWidth + self.extraClosePixels, duration);
      }

      setTransformX(self.sidenav, (-1 * self.width) + targetTransform);
      self.backdrop.style.opacity = targetOpacity;

      if (timePassed < duration) {
        requestAnimationFrame(animate);
      } else {
        if (show) {
          self.currentOpacity = self.sidenavOpacity;
          self.currentWidth = self.width;
        } else {
          self.currentOpacity = 0;
          self.currentWidth = 0;
        }
        resolve();
      }
    }
  });
  return promise;
};

Sidenav.prototype.initEvents = function() {
  var self = this;
  var fingerId = null;
  var startX = null;
  var startY = null;
  var startWidth = null;
  var wasInSidenavOnce = false;
  var horizontalLock = false;
  var previousX = null;
  var previousY = null;

  self.backdrop.addEventListener("click", function() {
    self.close();
  });

  doc.addEventListener("touchstart", touchstart);

  function touchstart(e) {
    if (self.isBusy) { return; }
    if (fingerId !== null) { return; }

    if (e.touches.length !== 1) { return; }

    // if closed, check if the touch is from the left edge of the screen
    if (!self.isOpened && e.touches[0].clientX > 10) { return; }

    fingerId = e.touches[0].identifier;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startWidth = self.currentWidth;
    wasInSidenavOnce = false;
    horizontalLock = false;
    previousX = -999;
    previousY = -999;

    // bind touchmove and end cancel events
    doc.addEventListener("touchmove", touchmove);
    doc.addEventListener("touchcancel", touchfinish);
    doc.addEventListener("touchend", touchfinish);
  }

  function touchmove(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (fingerId === e.changedTouches[i].identifier) {
        if (Math.abs(e.changedTouches[i].clientX - previousX) < 1 &&
            Math.abs(e.changedTouches[i].clientY - previousY) < 1) {
          // Do not over invoke move event
          return;
        }
        previousX = e.changedTouches[i].clientX;
        previousY = e.changedTouches[i].clientY;

        if (self.isOpened) {
          if (!horizontalLock && Math.abs(startX - e.changedTouches[i].clientX) < Math.abs(startY - e.changedTouches[i].clientY)) {
            doTouchFinish(null);
            return;
          }

          horizontalLock = true;

          // check if direction is horizontal, check if are on sidenav
          if (!wasInSidenavOnce && e.changedTouches[i].clientX > self.currentWidth) { return; }
        }
        wasInSidenavOnce = true;

        self.expandTo(startWidth + (e.changedTouches[i].clientX - Math.min(startX, self.width)));
        return;
      }
    }
  }

  function touchfinish(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (fingerId === e.changedTouches[i].identifier) {
        doTouchFinish(wasInSidenavOnce ? self.currentWidth > self.width / 2 : null);
      }
    }
  }

  function doTouchFinish(shouldOpen) {
    if (shouldOpen === true) {
      self.open();
    } else if (shouldOpen === false) {
      self.close();
    }
    doc.removeEventListener("touchmove", touchmove);
    doc.removeEventListener("touchcancel", touchfinish);
    doc.removeEventListener("touchend", touchstart);
    fingerId = null;
  }
};

function setTransformX(domEl, px) {
  domEl.style.transform = "translate3d(" + px + "px, 0, 0)";
  domEl.style["-webkit-transform"] = "translate3d(" + px + "px, 0, 0)";
}
function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}
