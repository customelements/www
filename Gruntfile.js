module.exports = function (grunt) {
	grunt.initConfig({
		jshint: {
			files: ['js/*.js']
		},
		concat: {
			dist: {
				files: {
					'dist/main.js': [
						'js/vendor/jquery.js',
						'js/vendor/lodash.js',
						'js/vendor/jquery.timeago.js',
						'js/vendor/list.js',
						'js/main.js'
					]
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/main.js': 'dist/main.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [
		'jshint',
		'concat',
		'uglify'
	]);
};
