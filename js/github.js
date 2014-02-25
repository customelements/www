(function (win, $) {
    'use strict';

    var GithubIssue = function () {
        var instance = this;

        instance.handleFormSubmit();
    };

    GithubIssue.prototype.handleFormSubmit = function () {
        var instance = this;

        $('#form-github-add').on('submit', function (e) {
            e.preventDefault();

            var repoURL = $('#repo').val();
            var repoName = repoURL.substring(repoURL.lastIndexOf('/') + 1, repoURL.length);

            win.location.href = 'https://github.com/customelements/customelements.io/issues/new?title=Add new component - ' + repoName + '&body=' + repoURL;
        });
    };

    window.GithubIssue = GithubIssue;

})(window, jQuery);
