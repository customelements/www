(function (win, $, _) {
    'use strict';

    var Featured = function () {
        this.modules = this.getFeaturedRepos();

        this.setFeatured();
    };

    Featured.prototype.getFeatured = function() {
        var res = (function () {
            var res = null;
            $.ajax({
                async: false,
                global: false,
                url: '/data/featured.json',
                dataType: 'json',
                success: function (data) {
                    res = data;
                }
            });
            return res;
        })();

        return res;

    };

    Featured.prototype.getFeaturedRepos = function() {
        var self = this;

        var res = (function () {
            var res = [];
            _.each(self.getFeatured(), function(featured){
                $.ajax({
                    async: false,
                    global: false,
                    url: 'https://api.github.com/repos/' + featured.repository,
                    dataType: 'json',
                    success: function (data) {
                        res.push(data);
                    }
                });
            });
            return res;
        })();

        return res;

    };

    Featured.prototype.setFeatured = function() {
        var self = this;

        var topModules = _.sortBy(self.modules, function (el, value) {
            return el.stargazers_count;
        }).reverse().splice(0, 3);

        self.popularModules = _.template($('#featured-elements-template').html(), {
            modules: topModules
        });
    };

    Featured.prototype.append = function() {
        $('#loading-featured-elements').remove();
        $('#featured-elements-popular').append(this.popularModules);
    };

    win.Featured = Featured;

})(window, jQuery, _);
