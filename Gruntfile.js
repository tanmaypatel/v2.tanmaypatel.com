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
									 'styles/style.css': ['styles/style.less']
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

						 copy: {
							 development: {
								 files: [
									 {src: ['scripts/script.js'], dest: 'scripts/script.min.js'}
								 ]
							 }
						 },

						 watch: {
							 options: {
								 livereload: true
							 },
							 styles: {
								 files: 'styles/**/*.less',
								 tasks: ['less:development']
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default Task(s)
	grunt.registerTask('default', ['less:development', 'jshint:development', 'uglify:thirdparty', 'copy:development', 'watch']);
	grunt.registerTask('dist', ['less:dist', 'jshint:development', 'uglify:thirdparty', 'uglify:dist']);
};
