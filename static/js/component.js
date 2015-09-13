var Component = function() {

};

Component.prototype = {
    submitForm: function(form, callback) {
        var formData = new FormData(form);
        var xhr = new XMLHttpRequest();
        var submitButton = form.querySelector('[type="submit"]');
        xhr.open(form.method, form.action);
        if (typeof callback == 'function') {
            if (submitButton) submitButton.disabled = true;
            xhr.addEventListener('load', function(event) {
                var json = {};
                if (submitButton) submitButton.disabled = false;
                try {
                    json = JSON.parse(event.target.response);
                } catch (error) {
                    console.log('XHR response in not valid JSON: ' + error);
                }
                if (json.errors) {
                    Object.keys(json.errors).forEach(function(key) {
                        form.querySelector('[name="' + key + '"]').classList.add('error');
                    });
                } else {
                    [].forEach.call(form.querySelectorAll('.error'), function(field) {
                        field.classList.remove('error');
                    });
                }
                callback(json);
            });
        }

        xhr.send(formData);

        return xhr;
    },
    setCookie: function(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            expires = '; expires=' + date.toUTCString();
        }

        document.cookie = name + '=' + value + expires + '; path=/';
    },
    getCookie: function(name) {
        var nameEQ = name + '=';
        var cookies = document.cookie.split(';');
        var cookieValue = null;
        cookies.forEach(function(cookie) {
            cookie = cookie.trim();
            if (cookie.indexOf(nameEQ) == 0) {
                cookieValue = cookie.substring(nameEQ.length, cookie.length);
            }
        });
        return cookieValue;
    },
    remCookie: function(name) {
        this.setCookie(name, '', -1);
    },
    getQueryParam: function(param) {
        var query = window.location.search.slice(1);
        var pairs = query.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            if (pair[0] == param) {
                return pair[1];
            }
        }
        return false;
    },
    getBrowser: function() {
        var ua = navigator.userAgent;
        var browser = ua.match(/(opera|chrome|safari|firefox|msie)/i);
        var temp;
        if (!browser) {
            return false;
        } else {
            browser = browser[1];
        }
        if (browser === 'Chrome') {
            temp = ua.match(/\bOPR/);
            if (temp) {
                browser = 'Opera';
            }
        }
        return browser.toLowerCase();
    },
    postPlayer: function(player, action, value) {
        var url = 'https:' + player.getAttribute('src').split('?')[0], //window.location.protocol (http) doesn't work anymore. hardcoded https
            data = {
                method: action
            };

        if (value) {
            data.value = value;
        }
        var message = JSON.stringify(data);
        player.contentWindow.postMessage(message, url);
    }
};

var component = new Component();