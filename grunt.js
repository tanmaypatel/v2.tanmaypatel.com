module.exports = function (grunt) {

    grunt.initConfig({

            less:{
                app:{
                    files: {
                        'styles/style.css': ['styles/style.less']
                    },
                    options: {
                        paths: ["styles"],
						compress: true
                    }
                }
            },

            lint:{
                files:['grunt.js',
                       'scripts/script.js']
            },

            concat:{
                thirdparty:{
                    src:['thirdparty/libs/modernizr.js',
                         'thirdparty/libs/jquery.js',
                         'thirdparty/bootstrap/js/bootstrap.js'],

                    dest:'thirdparty/thirdparty.js'
                }
            },

            min:{
                thirdparty:{
                    src:['thirdparty/thirdparty.js'],
                    dest:'thirdparty/thirdparty.min.js'
                },
                app:{
                    src:['scripts/script.js'],
                    dest:'scripts/script.min.js'
                }
            },

            uglify:{}
        }
    );

    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task.
    grunt.registerTask('default', 'less lint concat min');
};
