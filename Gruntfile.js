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
									 'styles/dist/style.css': ['styles/src/style.less']
								 }
							 },
							 dist: {
								 options: {
									 yuicompress: true,
									 cleancss: true
								 },
								 files: {
									 'styles/dist/style.css': ['styles/src/style.less']
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
										   'scripts/src/script.js']
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
									 'scripts/dist/script.min.js': ['scripts/src/script.js']
								 }
							 }
						 },

						 uncss: {
							 options: {
								 ignore: [/\.fixedNavigation*/]
							 },
							 dist: {
								 files: {
									 'styles/dist/style.tidy.css': ['index.src.html']
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
									 'styles/dist/style.css': ['styles/dist/style.tidy.css']
								 }
							 }
						 },

						 copy: {
							 development: {
								 files: [
									 {src: ['scripts/src/script.js'], dest: 'scripts/dist/script.min.js'}
								 ]
							 }
						 },

						 clean: {
							 dist_after: {
								 src: ['styles/dist/style.temp.css', 'styles/dist/style.tidy.css']
							 }
						 },

						 watch: {
							 options: {
								 livereload: true
							 },
							 styles: {
								 files: 'styles/src/**/*.less',
								 tasks: ['less:development']
							 },
							 scripts: {
								 files: 'scripts/src/**/*.js',
								 tasks: ['copy:development']
							 }
						 },
						 
						 processhtml: {
							 options: {
								 data: {
									 message: 'Preparing Distribution File!'
								 }
							 },
							 dist: {
								 files: {
									 'index.html': ['index.src.html']
								 }
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
	grunt.loadNpmTasks('grunt-processhtml');

	// Default Task(s)
	grunt.registerTask('default', ['less:development', 'jshint:development', 'uglify:thirdparty', 'copy:development']);
	grunt.registerTask('dist', ['less:dist', 'jshint:development', 'uglify:thirdparty', 'uglify:dist', 'uncss:dist', 'cssmin:dist', 'clean:dist_after', 'processhtml:dist']);
};
