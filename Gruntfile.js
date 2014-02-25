module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: 'js',
                    cleanBowerDir: true
                }
            }
        },

        jshint: {
            files: ['js/*.js']
        },

        concat: {
            dist: {
                files: {
                    'dist/main.js': [
                        'js/github.js',
                        'js/repositories.js',
                        'js/search.js',
                        'js/stats.js',
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
        },

        lintspaces: {
            all: {
                src: [
                    'css/*', 'data/*', 'js/*', 'index.html',
                    'Gruntfile.js', 'package.json', 'README.md'
                ],
                options: {
                    editorconfig: '.editorconfig'
                }
            }
        },

        watch: {
            files: ['js/*.js'],
            tasks: ['default']
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
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
