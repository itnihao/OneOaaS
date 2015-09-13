var Carousel = function(selector, settings) {
settings = settings || {};
this.settings = {
    onChange: settings.onChange || false
};
this.selector = selector;
this.navs = '[data-carousel-nav]';
this.items = '[data-carousel-item]';
this.pagination = '[data-pagination] a';
this.init();
};

Carousel.prototype = {
init: function() {
    var _this = this;
    this.carousel = document.querySelector(this.selector);
    var $items = $(this.carousel).find(this.items),
$navs = $(this.carousel).find(this.navs),
$pagination = $(this.carousel).find(this.pagination);
    var current_index = 0,
    is_animating = false;

    $items.eq(current_index).addClass('active');
    $pagination.eq(current_index).addClass('active');

$navs.on('click', function(event) {
    event.preventDefault();
if ($(this).attr('data-carousel-nav') == 'prev') {
goTo($items[current_index - 1] ? current_index - 1 : $items.length - 1);
} else {
  goTo($items[current_index + 1] ? current_index + 1 : 0);
  }
});

$pagination.on('click', function(event) {
    event.preventDefault();
goTo($pagination.index($(this)));
});

function goTo(index) {
    if (is_animating || index == current_index) return;
    var from_right = false;
    is_animating = true;
if (current_index > index) {
    from_right = true;
}
current_index = index;
$items.removeClass('active');
$pagination.removeClass('active');
setTimeout(function() {
    $pagination.eq(current_index).addClass('active');
}, 25);
setTimeout(function() {
    $items.eq(index).addClass('active');
setTimeout(function() {
    is_animating = false;
}, 300);
}, 300);
if (_this.settings.onChange) {
_this.settings.onChange({
    index: current_index,
element: $items[index]
});
}
}
}
};