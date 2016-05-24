// Nav

var navTrigger = $('#nav-trigger');
var nav = $('#nav-container');
var navBar = $('#nav-bar');
var navTriggered = false;
var containerOffset = $('#content-container').offset();

navBar.css("margin-left", (containerOffset.left + 30) + "px");

nav.css('width', (containerOffset.left + 30) + "px");
nav.css('left', "-" + (containerOffset.left + 30) + "px");

navTrigger.click(function () {
    if (navTriggered === false) {
        nav.css('left', "0px");
        navTriggered = true;
    } else {
        nav.css('left', "-" + (containerOffset.left + 30) + "px");
        navTriggered = false;
    }
});

window.onresize = function(event) {
    navBar.css("margin-left", (containerOffset.left + 30) + "px");
};
