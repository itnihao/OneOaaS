document.addEventListener('DOMContentLoaded', function() {
    new Hires();
});

var Hires = function() {
    this.attr = 'data-hires';
    this.minDPR = 1.5;
    this.imageRatio = 2;
    if (!window.devicePixelRatio) return;
    this.devicePixelRatio = window.devicePixelRatio;
    if (this.devicePixelRatio >= this.minDPR) {
        this.init();
    }
};

Hires.prototype = {
    init: function() {
        var self = this;
        self.$$node = document.querySelectorAll('[' + self.attr + ']');
        [].forEach.call(self.$$node, function($node) {
            if ($node.tagName.toLowerCase() == 'img') {
                self.processImg($node);
            }
        });
    },
    processImg: function($node) {
        var self = this;
        var image = new Image();
        image.src = $node.getAttribute(self.attr);
        image.addEventListener('load', function() {
            $node.src = image.src;
        });
        image.addEventListener('error', function() {
            if (console && console.error) {
                console.error($node, '404 hires image');
            }
        });
    }
};