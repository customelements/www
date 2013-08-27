/*global jQuery, _, List */
(function (win, $) {
	'use strict';

	$(function () {
		var modules = customElements;

		var topModules = _.sortBy(modules, function (el) {
			return el.stars;
		}).reverse().splice(0, 3);

		var allModules = _.sortBy(modules, function (el) {
			el.name = el.name.replace('-element', '');
			return el.name;
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
})(window, jQuery);