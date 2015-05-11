module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['public/js/*.js']
        },

        concat: {
            dist: {
                files: {
                    'public/dist/main.js': [
                        'public/js/github.js',
                        'public/js/repositories.js',
                        'public/js/featured.js',
                        'public/js/search.js',
                        'public/js/stats.js',
                        'public/js/main.js'
                    ]
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'public/dist/main.js': 'public/dist/main.js'
                }
            }
        },

        lintspaces: {
            all: {
                src: [
                    'public/css/*', 'public/data/*', 'public/js/*', 'public/index.html',
                    'Gruntfile.js', 'README.md'
                ],
                options: {
                    editorconfig: '.editorconfig'
                }
            }
        },

        watch: {
            files: ['public/js/*.js'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-lintspaces');

    grunt.registerTask('default', [
        'lintspaces',
        'jshint',
        'concat',
        'uglify'
    ]);
};
