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
					'js/<%= pkg.name %>.js': 'coffee/<%= pkg.name %>.coffee',
					'js/jquery.wiggle.js': 'coffee/jquery.wiggle.coffee'
				}
			}
		},
		jade: {
			compile: {
				files :{
					 "index.html": "index.jade",
					 "wiggle.html": "wiggle.jade"
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= pkg.version %> -  <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['js/jquery.wiggle.js','js/<%= pkg.name %>.js'],
				dest: 'js/<%= pkg.name %>.min.js'
			}
		},
		watch: {
			coffee: {
				files: 'coffee/*.coffee',
				tasks: ['coffee','uglify'],
				options: {
					interrupt: true,
				},
			},
			jade: {
				files: './*.jade',
				tasks: ['jade'],
				options: {
					interrupt: true,
				},
			},
		},
	});
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['coffee','jade','uglify']);

};