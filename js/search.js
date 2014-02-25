(function (win, $, _) {
    var Search = function () {
        this.pageTitle   = $('title').text();
        this.searchInput = $('.search');

        this.bindInput()
        this.createList();
        this.parseQueryString();
    };

    Search.prototype.createList = function() {
        var self = this;

        self.list = new List('all', {
            valueNames: [
                'name',
                'desc',
                'stars',
                'forks',
                'author'
            ]
        });
    };

    Search.prototype.bindInput = function() {
        var self = this;

        self.searchInput.show();

        if (history.replaceState) {
            self.searchInput.on('input', function(e) {
                var inputValue = e.target.value,
                    hrefValue;

                if (inputValue !== '') {
                    hrefValue = '?q=' + inputValue;
                }
                else {
                    hrefValue = '.';
                }

                history.replaceState(self.pageTitle, self.pageTitle, hrefValue);
            });
        }
    };

    Search.prototype.parseQueryString = function() {
        var self        = this;
        var queryString = win.location.search.substring(1);

        if (queryString !== '') {
            var queryParams = self.generateQueryParams(queryString.split('&'));

            self.searchInput.val(queryParams.q);
            self.list.search(queryParams.q);
        }
    };

    Search.prototype.generateQueryParams = function(queryString) {
        var queryParams = {};

        for (var i in queryString) {
            var key = queryString[i].split('=');

            if (key.length > 1) {
                var normalizedKey = decodeURIComponent(
                    key[0].replace(/\+/g, " ")
                );

                var normalizedValue = decodeURIComponent(
                    key[1].replace(/\+/g, " ")
                );

                queryParams[normalizedKey] = normalizedValue;
            }
        }

        return queryParams;
    };

    window.Search = Search;

})(window, jQuery, _);
