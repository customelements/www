(function (win, $) {
    'use strict';

    $(function () {
        $('#loading').remove();

        new Repositories(window.customElements).append();
        new Search();
        new GithubIssue();
    });
})(window, jQuery);
