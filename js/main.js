/*global jQuery, _, List */
(function (win, $) {
    'use strict';

    $(function () {
        var modules = customElements;
        var pageTitle = $('title').text();

        var topModules = _.sortBy(modules, function (el) {
            return el.stars;
        }).reverse().splice(0, 3);

        var lastModules = _.sortBy(modules, function (el) {
            return el.created;
        }).reverse().splice(0, 3);

        var allModules = _.sortBy(modules, function (el) {
            el.name = el.name.replace('-custom-element', '')
                             .replace('-element', '')
                             .replace('-web-component', '');
            return el.name;
        });

        var mostPopTpl = _.template($('#most-popular-template').html(), {
            modules: topModules
        });

        var latestTpl = _.template($('#latest-elements-template').html(), {
            modules: lastModules
        });

        var allTpl = _.template($('#all-template').html(), {
            modules: allModules
        });

        $('#loading').remove();
        $('#most-popular').append(mostPopTpl);
        $('#latest-popular').append(latestTpl);
        $('#all').append(allTpl);

        var searchInput = $('.search');
        searchInput.show();

        searchInput.on('input', function(e) {
            var inputValue = e.target.value,
                hrefValue;

            if (inputValue !== '') {
                hrefValue = '?q=' + inputValue;
            } else {
                hrefValue = '.';
            }

            history.replaceState(pageTitle, pageTitle, hrefValue);
        });

        var list = new List('all', {
            valueNames: [
                'name',
                'desc',
                'stars',
                'forks',
                'author'
            ]
        });

        var queryString = window.location.search.substring(1);

        if (queryString !== '') {
            var queryParams = {};
            queryString = queryString.split('&');

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

            searchInput.val(queryParams.q);
            list.search(queryParams.q);
        }

    });
})(window, jQuery);
