// Nav

var navTrigger = $('#nav-trigger');
var nav = $('#nav-container');
var navBar = $('#nav-bar');
var navSize = "300";

var navTriggered = false;

var containerOffset = $('#content-container').offset();

navBar.css("margin-left", (containerOffset.left) + "px");
navBar.css("width", ($(window).width() - containerOffset.left) + "px");

if (containerOffset.left < 300) {

    nav.css('width', (navSize) + "px");
    nav.css('left', "-" + (navSize) + "px");

    navTrigger.click(function () {
        closeMenu(navSize)
    });
} else {

    nav.css('width', (containerOffset.left) + "px");
    nav.css('left', "-" + (containerOffset.left) + "px");

    navTrigger.click(function () {
        closeMenu(containerOffset.left);
    });
}

function closeMenu(size)
{
    if (navTriggered === false) {
        nav.css('left', "0px");
        navTriggered = true;
    } else {
        nav.css('left', "-" + size + "px");
        navTriggered = false;
    }
}

function triggerSubMenu(id)
{
    var subTrigger = $('#sub-trigger-' + id + ' ul');

    if (subTrigger.hasClass('sub-menu-closed')) {
        subTrigger.slideDown();
    } else {
        subTrigger.slideUp();
    }

    subTrigger.toggleClass('sub-menu-closed');
}


$("[id^='sub-trigger-']").click(function(){
   var id = $(this)
       .attr('id')
       .split('-')[2];

    triggerSubMenu(id);
});

$('#nav-close').click(function(){
    if (containerOffset.left < 300) {
        closeMenu(navSize);
    } else {
        closeMenu(containerOffset.left);
    }
});
