module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            dev: {
                options: {
                    script: './app.js'
                }
            }
        },
        watch: {
            express: {
                files: [ '*.js' ],
                tasks: [ 'express:dev' ],
                options: {
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        }
    });

    grunt.registerTask('server', ['express:dev', 'watch']);
    grunt.registerTask('default', ['server']);
};
