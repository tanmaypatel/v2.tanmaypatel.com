module.exports = function(grunt)
{

	grunt.initConfig({
						 less: {
							 options: {
								 report: 'min'
							 },
							 development: {
								 options: {
									 dumpLineNumbers: 'comments'
								 },
								 files: {
									 'styles/style.css': ['styles/style.less']
								 }
							 },
							 dist: {
								 options: {
									 yuicompress: true,
									 cleancss: true
								 },
								 files: {
									 'styles/style.temp.css': ['styles/style.less']
								 }
							 }
						 },

						 jshint: {
							 options: {
								 smarttabs: true
							 },
							 development: {
								 files: {
									 src: ['Gruntfile.js',
										   'scripts/script.js']
								 }
							 }
						 },

						 uglify: {
							 thirdparty: {
								 files: {
									 'thirdparty/thirdparty.min.js': ['thirdparty/libs/modernizr.js',
																	  'thirdparty/libs/jquery.js',
																	  'thirdparty/bootstrap/js/bootstrap.js']
								 }
							 },
							 dist: {
								 files: {
									 'scripts/script.min.js': ['scripts/script.js']
								 }
							 }
						 },

						 uncss: {
							 options: {
								 ignore: []
							 },
							 dist: {
								 files: {
									 'styles/style.tidy.css': ['index.html']
								 }
							 }
						 },

						 cssmin: {
							 options: {
								 keepSpecialComments: 0,
								 report: 'min'
							 },
							 dist: {
								 files: {
									 'styles/style.css': ['styles/style.tidy.css']
								 }
							 }
						 },

						 copy: {
							 development: {
								 files: [
									 {src: ['scripts/script.js'], dest: 'scripts/script.min.js'}
								 ]
							 }
						 },

						 concat: {
							 development: {
								 src: ['thirdparty/bootstrap/css/bootstrap.min.css', 'thirdparty/bootstrap/css/bootstrap-responsive.min.css', 'styles/style.css'],
								 dest: 'styles/style.css'
							 },
							 dist: {
								 src: ['thirdparty/bootstrap/css/bootstrap.min.css', 'thirdparty/bootstrap/css/bootstrap-responsive.min.css', 'styles/style.temp.css'],
								 dest: 'styles/style.css'
							 }
						 },

						 clean: {
							 dist_after: {
								 src: ['styles/style.temp.css', 'styles/style.tidy.css']
							 }
						 },

						 watch: {
							 options: {
								 livereload: true
							 },
							 styles: {
								 files: 'styles/**/*.less',
								 tasks: ['less:development', 'concat:development']
							 },
							 scripts: {
								 files: 'scripts/**/*.js',
								 tasks: ['copy:development']
							 }
						 }
					 }
	);

	// Load Required Grunt Plug-in(s)
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default Task(s)
	grunt.registerTask('default', ['less:development', 'jshint:development', 'uglify:thirdparty', 'concat:development', 'copy:development']);
	grunt.registerTask('dist', ['less:dist', 'concat:dist', 'jshint:development', 'uglify:thirdparty', 'uglify:dist', 'uncss:dist', 'clean:dist_after']);
};
