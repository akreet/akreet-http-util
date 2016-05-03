(function (window) {
    var HttpUtil = {

        /**
         * Extracts parameters from location.search
         *
         * @param name
         * @returns {string}
         */
        getParam: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(window.location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        isParamPresent: function (name) {
            return new RegExp(name).test(location.href);
        },

        getParams: function() {
            var query = location.search.substr(1);
            var result = {};
            query.split("&").forEach(function(part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
            });
            return result;
        },

        /**
         * Ensures that there is an http:// protocol before the url otherwize
         * just return the url.
         */
        normalizeHttp: function (url) {
            if (!/^http:\/\//.test(url)) {
                return 'http://' + url;
            }
            return url;
        },

        /**
         * Takes object and converts to an encoded query parameter string.
         *
         * @method toQueryString
         * @param {Object} obj To be converted to query string.
         */
        toQueryString: function (obj) {
            var str = [];
            for (var p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        },

        isProperUrl: function(url) {
            return /^https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}$/.test(url);
        }

    }
    window.HttpUtil = HttpUtil;
})(window);