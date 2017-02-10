var gulp = require('gulp'),
	connect = require('gulp-connect'),
	browserify = require('gulp-browserify'),
	uglify  = require('gulp-uglify'),
	source = require('vinyl-source-stream'),
	concat = require('gulp-concat'),

	port = process.env.port || 5000 ;

	gulp.task('browserify',function(){
		gulp.src('./app/js/main.js')
		.pipe(browserify({
			transform:'reactify',
			debug: true,
		}))
		.pipe(gulp.dest('./dist/js'))
	});

	gulp.task('connect',function(){
		connect.server({
			root:'./',
			port:port,
			livereload:true,
		})
	});

	gulp.task('js',function(){
		gulp.src('./dist/**/*.js')
		.pipe(connect.reload())
	});

	gulp.task('build',function(){
		gulp.src('./dist/js/main.js')
		.pipe(concat('main.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
	});

	gulp.task('html',function(){
		gulp.src('./app/**/*.html')
		.pipe(connect.reload())
	});

	gulp.task('watch',function(){
		gulp.watch('./dist/**/*.js',['js', 'build']);
		gulp.watch('./app/**/*.html',['html']);
		gulp.watch('./app/**/*.js',['browserify']);
	});

	gulp.task('default',['browserify']);

	gulp.task('server',['browserify','connect','watch']);
