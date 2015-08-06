"use strict";

var sidenav = new Sidenav({
  content: document.getElementById("content"),
  sidenav: document.getElementById("sidenav"),
  backdrop: document.getElementById("backdrop")
});

document.getElementById("menu-toggle").addEventListener("click", function() {
  sidenav.open();
});
