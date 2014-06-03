(function (win, $, _) {
    'use strict';

    var PER_PAGE_PAGINATION = 30;

    var Search = function () {
        this.pageTitle   = $('title').text();
        this.searchInput = $('.search');
        this.loadMoreButton = $('.button.load-more');

        this.bindInput();
        this.bindLoadMore();
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
            ],
            page: PER_PAGE_PAGINATION
        });
    };

    Search.prototype.loadMore = function() {
        var self      = this;
        var pageItems = self.list.page;

        self.list.show(1, pageItems+PER_PAGE_PAGINATION);
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
                    self.loadMoreButton.hide();
                }
                else {
                    hrefValue = '.';
                    self.loadMoreButton.show();
                }

                history.replaceState(self.pageTitle, self.pageTitle, hrefValue);
            });
        }
    };

    Search.prototype.bindLoadMore = function() {
        var self = this;

        self.loadMoreButton.on('click', function (event) {
            event.preventDefault();

            if (!self.hasNextPage()) {
                self.loadMoreButton.hide();
            }

            self.loadMore();
        });
    };

    Search.prototype.hasNextPage = function() {
        var self = this;

        return (self.list.page <= (self.list.items.length - PER_PAGE_PAGINATION));
    };

    Search.prototype.parseQueryString = function() {
        var self        = this;
        var queryString = win.location.search.substring(1);

        if (queryString !== '') {
            var queryParams = self.generateQueryParams(queryString.split('&'));

            self.loadMoreButton.hide();
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
