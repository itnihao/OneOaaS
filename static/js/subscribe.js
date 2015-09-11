document.addEventListener('DOMContentLoaded', function() {
    new Subscribe();
});

var Subscribe = function() {
    this.subscribe_selector = '[data-subscribe]';
    this.success_selector = '[data-subscribe-success]';
    this.init();
};

Subscribe.prototype = {
    init: function() {
        var _this = this;
        this.subscribes = document.querySelectorAll(this.subscribe_selector);
        [].forEach.call(this.subscribes, function(subscribe) {
            var form = subscribe.querySelector('form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                component.submitForm(form, function(response) {
                    if (response.success) {
                        var subscribeSourceGA = form.querySelector('[name="gaSubscribeSource"]');
                        if (_gaq && subscribeSourceGA) {
                            _gaq.push(['_trackEvent', 'Email Subscription', 'Subscribe', subscribeSourceGA.value, 1, true]);
                        }
                        form.style.display = 'none';
                        subscribe.querySelector(_this.success_selector).style.display = 'block';
                    } else {

                    }
                });
            });
        });
    }
};