(function (win, $) {
    'use strict';

    $(function () {
        $('#loading').remove();

        new Stats(window.customElements).append();
        new Repositories(window.customElements).append();
        new Search();
    });
})(window, jQuery);
