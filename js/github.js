(function (win, $) {
	'use strict';

	var GithubIssue = function () {
		var instance = this;

		instance.handleFormSubmit();
	};

	GithubIssue.prototype.isValidRepo = function (repo) {
		var regex = /^(http(s)?:\/\/)?github.com\/[A-Za-z0-9\.]+\/[A-Za-z0-9\.]+$/;

		return repo.match(regex);
	};

	GithubIssue.prototype.handleFormSubmit = function () {
		var instance = this;

		$('#form-github-add').on('submit', function (e) {
			e.preventDefault();

			var repositoryURL = $('#repo').val();

			if (instance.isValidRepo(repositoryURL)) {
				win.location.href = 'https://github.com/customelements/customelements.io/issues/new?title=Adding some new component for ' + repositoryURL + '&body=' + repositoryURL;
			}
			else {
				alert('Please, type a valid repository!');
			}
		});
	};

	$(function() { new GithubIssue(); });
})(window, jQuery);