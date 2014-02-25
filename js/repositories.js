(function (win, $, _) {
    'use strict';

    var Repositories = function (modules) {
        this.modules = modules;

        this.setRepositories();
    };

    Repositories.prototype.setRepositories = function() {
        var self = this;

        self.repositories = _.sortBy(self.modules, function (el) {
            el.name = self.removeSuffix(el.name);

            return el.name;
        });
    };

    Repositories.prototype.removeSuffix = function(name) {
        var suffixBlackList = ['-custom-element', '-element', '-web-component'];

        for (var i = 0; i < suffixBlackList.length; i++) {
            name = name.replace(suffixBlackList[i], '');
        }

        return name;
    };

    Repositories.prototype.parse = function(repos) {
        return _.template($('#all-template').html(), {
            modules: repos
        });
    };

    Repositories.prototype.append = function() {
        var self = this;

        $('#all').append(self.parse(self.repositories));
    };

    win.Repositories = Repositories;

})(window, jQuery, _);
