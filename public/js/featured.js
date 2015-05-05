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
                        data.url = data.html_url;
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

        self.featuredModules = _.template($('#list-template').html(), {
            modules: self.modules.splice(0, 3)
        });
    };

    Featured.prototype.append = function() {
        $('#featured-elements').html(this.featuredModules);
    };

    win.Featured = Featured;

})(window, jQuery, _);
