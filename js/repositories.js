(function (win, $, _) {
    'use strict';

    var Repositories = function (modules) {
        this.modules = modules;

        this.setRepositories();
    };

    Repositories.prototype.setRepositories = function() {
        var self = this;

        self.repositories = _.sortBy(self.modules, function (el) {
            return el.name;
        });
    };

    Repositories.prototype.sortByStars = function(repos) {
        return _.sortBy(repos, function (el) {
            return el.stars;
        }).reverse();
    };

    Repositories.prototype.parse = function(repos) {
        var self   = this;
        var sorted = self.sortByStars(repos);

        return _.template($('#all-template').html(), {
            modules: sorted
        });
    };

    Repositories.prototype.append = function() {
        var self = this;

        $('#all').append(self.parse(self.repositories));
    };

    win.Repositories = Repositories;

})(window, jQuery, _);
