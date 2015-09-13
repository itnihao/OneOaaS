var Banner = function(selector, cookie_name) {
    var _this = this;
    _this.selector = selector;
    _this.cookie_name = cookie_name;
    _this.init();
    document.addEventListener('DOMContentLoaded', function() {
        _this.init();
    });
};

Banner.prototype = {
    init: function() {
        var _this = this;
        _this.bannerElement = document.querySelector(_this.selector);
        _this.closeElement = _this.bannerElement.querySelector('[data-close]');
        if (_this.closeElement) {
            _this.closeElement.addEventListener('click', function(event) {
                _this.close();
            });
        }
    },
    close: function() {
        var _this= this;
        _this.bannerElement.style.display = 'none';
        component.setCookie(_this.cookie_name, 1, 30);
    }
};