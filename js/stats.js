(function (win, $, _) {
    'use strict';

    var Stats = function (modules) {
        this.modules = modules;

        this.initialize();
    };

    Stats.prototype.initialize = function() {
        this.setPopular();
        this.setLatests();
    };

    Stats.prototype.setPopular = function() {
        var self = this;

        var topModules = _.sortBy(self.modules, function (el) {
            return el.stars;
        }).reverse().splice(0, 3);

        self.popularModules = _.template($('#list-template').html(), {
            modules: topModules
        });
    };

    Stats.prototype.setLatests = function() {
        var self = this;

        var lastModules = _.sortBy(self.modules, function (el) {
            return el.created;
        }).reverse().splice(0, 3);

        self.latestModules = _.template($('#list-template').html(), {
            modules: lastModules
        });
    };

    Stats.prototype.append = function() {
        $('#popular-elements').html(this.popularModules);
        $('#latest-elements').html(this.latestModules);
    };

    win.Stats = Stats;

})(window, jQuery, _);
