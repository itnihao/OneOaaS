var _gaq = _gaq || [];

var GASocialTracking = function() {

};

GASocialTracking.prototype = {
    /*
     * Docs: https://dev.twitter.com/web/javascript/events
     * */
    trackTwitter: function() {
        var _this = this,
            opt_target,
            network = 'twitter';

        try {
            // tweet
            twttr.events.bind('tweet', function(event) {
                if (event.target.nodeName.toUpperCase() == 'IFRAME') {
                    opt_target = _this.getParamFromUrl(event.target.src, 'url');
                }
                _this.push(network, event.type, opt_target);
            });

            // follow
            twttr.events.bind('follow', function(event) {
                opt_target = event.data.user_id + ' (' + event.data.screen_name + ')';
                _this.push(network, event.type, opt_target);
            });

            // retweet
            twttr.events.bind('retweet', function(event) {
                opt_target = event.data.source_tweet_id;
                _this.push(network, event.type, opt_target);
            });

            // favorite
            twttr.events.bind('favorite', function(event) {
                opt_target = event.data.tweet_id;
                _this.push(network, event.type, opt_target);
            });
        } catch (e) {
            if (console) console.log('GA Twitter Tracking error:', e);
        }
    },
    /*
     * Docs: https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.2?locale=en_GB
     * */
    trackFacebook: function() {
        var  _this = this,
            network = 'facebook';
        try {
            FB.Event.subscribe('edge.create', function(url) {
                _this.push(network, 'like', url);
            });
            FB.Event.subscribe('edge.remove', function(url) {
                _this.push(network, 'unlike', url);
            });
            FB.Event.subscribe('message.send', function(url) {
                _this.push(network, 'message', url);
            });
            FB.Event.subscribe('comment.create', function(obj) {
                _this.push(network, 'comment.create', obj.href);
            });
            FB.Event.subscribe('comment.remove', function(obj) {
                _this.push(network, 'comment.remove', obj.href);
            });
        } catch (e) {
            if (console) console.log('GA Facebook Tracking error:', e);
        }
    },
    push: function(network, socialAction, opt_target) {
        _gaq.push(['_trackSocial', network, socialAction, opt_target, undefined]);
    },
    getParamFromUrl: function(url, param) {
        var pairs = url.split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            if (pair[0] == param) {
                return decodeURIComponent(pair[1]);
            }
        }
        return false;
    }
};

var gaSocialTracking = new GASocialTracking();