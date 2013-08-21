/*global jQuery, _, List */
(function (win, $) {
	'use strict';

	$(function () {
		$.getJSON('data/repos.json', function (modules) {

			var topModules = _.sortBy(modules, function (el) {
				return el.stars;
			}).reverse().splice(0, 3);

			console.log(topModules);

			var allModules = _.sortBy(modules, function (el) {
				// removing `grunt-` since some plugins don't contain it
				return el.name.replace('grunt-', '');
			});

			var latestTpl = _.template($('#most-popular-template').html(), {
				modules: topModules
			});

			var allTpl = _.template($('#all-template').html(), {
				modules: allModules
			});

			$('#loading').remove();
			$('#most-popular').append(latestTpl);
			$('#all').append(allTpl).find('.search').show();

			new List('all', {
				valueNames: [
					'name',
					'desc',
					'stars',
					'forks',
					'author'
				]
			});
		});
	});
})(window, jQuery);
