document.addEventListener('DOMContentLoaded', function() {
    new DownloadPopup();
});

var DownloadPopup = function() {
    this.trigger_attr = 'data-download-link';
    this.init();
};

DownloadPopup.prototype = {
    init: function() {
        var _this = this,
            triggers = document.querySelectorAll('[' + this.trigger_attr + ']');
        [].forEach.call(triggers, function(trigger) {
            var modal = new Modal(trigger.getAttribute(_this.trigger_attr));
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                modal.open();
                if (window.os_correct) {
                    var product_name = trigger.href.match(/([^/]*)\.dmg$/)[1];
                    _this.trackDownload(product_name);
                    if (_gaq) _gaq.push(['_trackPageview', '/download-popup/' + product_name]);
                    clearTimeout(window.download_timeout);
                    window.download_timeout = setTimeout(function() {
                        window.location.href = trigger.href;
                    }, 3000);
                }
            });
        });
    },
    trackDownload : function(prodName){
        $.post( "/backend/trackdownload", { pname : prodName });
    }
};