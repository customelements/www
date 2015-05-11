(function (win, $) {
    'use strict';

    $(function () {
        $.ajax({
            url: 'http://search.customelements.io/?perPage=1500',
            dataType: 'json',
            jsonp: 'callback',
            success: function(data) {
                var html = '';

                data.results.forEach(function(repo) {
                    html += '<tr>' +
                        '<td class="name">' +
                            '<a target="_blank" href="https://github.com/' + repo.owner + '/' + repo.name + '">' + repo.name + '</a>' +
                        '</td>' +
                        '<td class="desc">' + escape(repo.description) + '</td>' +
                        '<td class="stars">' + repo.stargazers_count + '</td>' +
                        '<td class="forks">' + repo.forks_count + '</td>' +
                        '<td class="author">' +
                            '<a target="_blank" href="https://github.com/' + repo.owner + '/' + '">' + repo.owner + '</a>' +
                        '</td>' +
                    '</tr>';
                });

                $('.list').html(html);
                $('.search-query').attr('placeholder', 'Search in ' + data.total + ' repos...');

                new Search();
            }
        });

        function escape(str) {
            if (!str) {
                return '';
            }

            return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    });
})(window, jQuery);



