document.addEventListener('DOMContentLoaded', function() {
    var siteHeader = document.querySelector('#site-header');
    new Carousel('[data-carousel="index"]', {
        onChange: function(obj) {
            siteHeader.setAttribute('data-product', obj.element.getAttribute('data-product'))
        }
    });
});