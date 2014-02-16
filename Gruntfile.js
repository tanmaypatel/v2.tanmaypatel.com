module.exports = function(grunt)
{
	require('time-grunt')(grunt);

	grunt.initConfig({
		config: {
			srcLocation: 'src',
			distLocation: '.'
		},
		less: {
			options: {
				report: 'min'
			},
			development: {
				options: {
					dumpLineNumbers: 'comments'
				},
				files: {
					'<%= config.srcLocation %>/styles/dist/style.css': [ '<%= config.srcLocation %>/styles/src/style.less' ]
				}
			},
			dist: {
				options: {
					yuicompress: true,
					cleancss: true
				},
				files: {
					'<%= config.distLocation %>/styles/dist/style.css': [ '<%= config.srcLocation %>/styles/src/style.less' ]
				}
			}
		},

		jshint: {
			options: {
				smarttabs: true
			},
			development: {
				files: {
					src: [ 'Gruntfile.js', '<%= config.srcLocation %>/scripts/src/script.js' ]
				}
			}
		},

		uglify: {
			components: {
				files: {
					'<%= config.srcLocation %>/scripts/dist/components.min.js': [ '<%= config.srcLocation %>/components/modernizr/modernizr.js', '<%= config.srcLocation %>/components/jquery/jquery-1.11.0.min.js', '<%= config.srcLocation %>/components/jquery/jquery-migrate-1.2.1.min.js', '<%= config.srcLocation %>/components/bootstrap/js/bootstrap.min.js' ]
				}
			},
			dist: {
				files: {
					'<%= config.distLocation %>/scripts/dist/script.min.js': [ '<%= config.srcLocation %>/scripts/src/script.js' ]
				}
			}
		},

		uncss: {
			options: {
				ignore: [ /\.fixedNavigation*/,
						  /\.navbar(.)*.active*/ ]
			},
			dist: {
				files: {
					'<%= config.distLocation %>/styles/dist/style.tidy.css': [ '<%= config.srcLocation %>/index.html' ]
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
					'<%= config.distLocation %>/styles/dist/style.css': [ '<%= config.distLocation %>/styles/dist/style.tidy.css' ]
				}
			}
		},

		copy: {
			development: {
				files: [ {
					src: [ '<%= config.srcLocation %>/scripts/src/script.js' ],
					dest: '<%= config.srcLocation %>/scripts/dist/script.min.js'
				} ]
			},
			dist: {
				files: [ {
					src: [ '<%= config.srcLocation %>/scripts/dist/components.min.js' ],
					dest: '<%= config.distLocation %>/scripts/dist/components.min.js'
				}, {
					src: [ '<%= config.srcLocation %>/assets/Tanmay Patel.pdf' ],
					dest: '<%= config.distLocation %>/assets/Tanmay Patel.pdf'
				}, {
					cwd: '<%= config.srcLocation %>/styles/images/',
					src: '**',
					dest: '<%= config.distLocation %>/styles/images/',
					expand: true
				}, {
					cwd: '<%= config.srcLocation %>/styles/fonts/',
					src: '**',
					dest: '<%= config.distLocation %>/styles/fonts/',
					expand: true
				}]
			}
		},

		clean: {
			dist_before: {
				src: [ '<%= config.distLocation %>/styles/',
					   '<%= config.distLocation %>/scripts/',
					   '<%= config.distLocation %>/assets/' ]
			},
			dist_after: {
				src: [ '<%= config.distLocation %>/styles/dist/style.tidy.css' ]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			styles: {
				files: '<%= config.srcLocation %>/styles/src/**/*.less',
				tasks: [ 'less:development' ]
			},
			scripts: {
				files: '<%= config.srcLocation %>/scripts/src/**/*.js',
				tasks: [ 'copy:development' ]
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
					'<%= config.distLocation %>/index.html': [ '<%= config.srcLocation %>/index.html' ]
				}
			}
		}
	});

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
	grunt.registerTask('default', [ 'less:development', 'jshint:development', 'uglify:components', 'copy:development' ]);
	grunt.registerTask('dist', [ 'clean:dist_before', 'less:dist', 'jshint:development', 'uglify:components', 'uglify:dist', 'copy:dist', 'uncss:dist', 'cssmin:dist', 'clean:dist_after', 'processhtml:dist' ]);
};
