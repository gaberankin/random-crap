module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		coffee: {
			compile: {
				options: {
					bare: true,
				},
				files: {
					'js/app.js' : 'coffee/app.coffee',
					'js/<%= pkg.name %>.js': 'coffee/<%= pkg.name %>.coffee'
				}
			}
		},
		jade: {
			compile: {
				files :{
					 "index.html": "index.jade"
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> -  <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'js/<%= pkg.name %>.js',
				dest: 'js/<%= pkg.name %>.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');

	// Default task(s).
	grunt.registerTask('default', ['coffee','jade','uglify']);

};