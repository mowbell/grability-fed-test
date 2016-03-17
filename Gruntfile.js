module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration will be written here
        bower: {
            //para cargar las dependencias bower cuando se hace build
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: 'libs',
                    cleanTargetDir: true
                }
            }
        },
        jshint: {
            //Se configura que archivos se les debe validar la sintaxis y errores de javascript
            all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js'],
            dev: {
                files:{
                    src:['Gruntfile.js', 'app/*.js', 'app/**/*.js']
                },
                options:{
                    debug:true,
                    undef:false
                }
            }
        },
        /*karma: {
            //opciones de grunt-karma
            options: {
                configFile: 'config/karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },*/
        html2js: {
            //Opciones para el generador de html a js
            //compila los templates angular html a JS
            dist: {
                src: ['app/templates/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            //Concatenador de todos los archivos js
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/*.js', 'tmp/*.js'],
                dest: 'dist/app.js'
            }
        },
        uglify: {
            //Minifica el js generado por el concatenador
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                },
                options: {
                    mangle: false //esto hace que los nombres de las variables se renombren cortos
                }
            }
        },
        clean: {
            //Para remover archivos temporales
            temp: {
                src: ['tmp']
            },
            dist: {
                src: ['dist']
            }
        },
        watch: {
            options: {
                livereload: true
            },
            //se configura que archivos se monitorean para ejecutar instantaneamente cambios
            dev: {
                files: ['Gruntfile.js', 'app/*.js', 'app/**/*.html', 'assets/**/*.less'],
                tasks: ['clean:dist', 'jshint:dev', 'html2js:dist', 'concat:dist','less:dev', 'clean:temp'],

                options: {
                    atBegin: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'app/*.js', 'app/**/*.html', 'assets/**/*.less'],
                tasks: ['clean:dist', 'jshint', 'html2js:dist', 'concat:dist', 'less:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080,
                    livereload: true,
                    
                    middleware: function(connect, options, middlewares) {
                        //https://blog.gaya.ninja/articles/static-mockup-data-endpoints-connect/
                        middlewares.push(function(req, res, next) {
                            //stuff will go here
                            var endpoints = {
                                "news_mock.json": "news_mock.json",
                            };
                            var match = false;
                            var fileToRead = "";

                            Object.keys(endpoints).forEach(function(url) {
                                if (req.url.indexOf(url) === 0) {
                                    match = true;
                                    fileToRead = endpoints[url];
                                }
                            });

                            //no match with the url, move along
                            if (match === false) {
                                return next();
                            }

                            res.end(grunt.file.read(fileToRead));
                        });

                        return middlewares;
                    }
                }
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                src: [ 'index.html', 'dist/*.js', 'dist/*.css', 'libs/**', 'assets/**' ]
                /*files: [{
                    src: ['index.html'],
                    dest: '/'
                }, {
                    src: ['dist/**'],
                    dest: 'dist/'
                }, {
                    src: ['assets/**'],
                    dest: 'assets/'
                }, {
                    src: ['libs/**'],
                    dest: 'libs/'
                }]*/
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["assets/less"],
                    sourceMap:true,
                    sourceMapURL: '/dist/style.css.map',
                    //sourceMapBasepath: '/assets/less/'
                },
                files: {
                    "dist/style.css": "assets/less/style.less"
                }
            },
            dist: {
                options: {
                    paths: ["assets/less"],
                    cleancss: true
                },
                files: {
                    "dist/style.css": "assets/less/style.less"
                }
            }
        }
    });
    // Loading of tasks and registering tasks will be written here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-less');


    grunt.registerTask('dev', ['bower', 'connect:server', 'watch:dev']);
    grunt.registerTask('test', ['bower', 'jshint']);
    grunt.registerTask('minified', ['bower', 'connect:server', 'watch:min']);
    grunt.registerTask('package', ['bower', 'jshint', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'less:dist', 'clean:temp', 'compress:dist'
    ]);

};
