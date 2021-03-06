module.exports = function(grunt) {

	"use strict";

	grunt.initConfig({

		sass: {

			dev: {
				options: {
					unixNewlines: true,
					style: "expanded",
					lineNumbers: true,
					debugInfo: true,
					precision: 8,
					loadPath: "src/scss/"
				},

				files : {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			},

			dist: {
				options: {
					style: "compressed",
					precision : 8,
					loadPath: "src/scss/"
				},

				files : {
					"dist/css/app.min.css": "src/scss/app.scss"
				}
			}
		},

		autoprefixer: {

			dist : {
				options: {
					// add prefixes to support the last 2 browser versions,
					// as well as IE9+ and Android 4 stock browsers
					browsers: ["last 2 versions", "ie >= 9", "Android 4"],
					map: true
				},

				files: {
					"dist/css/app.min.css": "dist/css/app.min.css"
				}
			}
		},

		// TODO : Should we leave CSSO out of the tutorial?
		// If adding it, we may need to be careful and create a
		// temporary file so that the sourcemap doesn't get screwed up!
		
		// csso: {
		// 	dist: {
				
		// 		options: {
		// 			restructure: false
		// 		},

		// 		files: {
		// 			'style.css' : 'style.css'
		// 		},
		// 	}
		// },

		uglify: {

			dev: {
				options: {
					compress: false,
					mangle: false,
					preserveComments: true
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			},

			dist: {
				options: {
					compress: {
						drop_console: true
					},
					mangle: true
				},

				files: {
					"dist/js/app.min.js" : ["src/js/libs/atomic.js", "src/js/app/app.js"]
				}
			}
		},

		connect: {

			server : {
				options: {
					open: true
				}
			}
		},

		watch: {

			options: {
				livereload: true,
			},

			html: {
				files: ["index.html"],
			},
			
			js: {
				files: ["src/js/**/*.js"],
				tasks: ["uglify:dev"]
			},

			scss: {
				files: ["src/scss/**/*.scss"],
				tasks: ["sass:dev"]
			},

			img: {
				files: ["src/img/**/*.*"],
				tasks: ["copy:img"]
			}
		},

		copy: {

			img: {
				expand: true,
				cwd: "src/img/",
				src: "**/*.*",
				dest: "dist/img/"
			}
		}
	});

	require("load-grunt-tasks")(grunt);

	grunt.registerTask("breeze", ["sass:dev", "uglify:dev", "copy:img", "connect:server", "watch"]);
	grunt.registerTask("dist", ["sass:dist", "autoprefixer:dist", "uglify:dist", "copy:img"]);
};