'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),	
	//sprite = require('gulp-sprite-generator'),		
	webserver = require('gulp-webserver');	




var YOUR_LOCALS = {};
gulp.task('js', function(){
	gulp.src([		
		'bower_components/angular/angular.js',	
		'bower_components/firebase/firebase.js',	
		'bower_components/angularfire/dist/angularfire.js',	
		'bower_components/angular-ui-mask/dist/mask.js'		
		])			
		.pipe(concat('libs.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('build/dev'));	

	gulp.src([
			'build/dev/app/*.js',
			'build/dev/app/**/*.js',
			'!build/dev/app/**/*_test.js',
			])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/dev'));
});




gulp.task('css', function(){

	gulp.src([	
		'bower_components/bootstrap/bootstrap.css'		
		])
		.pipe(concat('theme.css'))
		.pipe(gulp.dest('build/dev'));
	

	gulp.src('build/dev/app/**/*.css')		
		.pipe(concat('app.css'))
		//autoprefix
		//minification
		.pipe(gulp.dest('build/dev'));
});

gulp.task('webserver', function(){
	gulp.src('build/dev/')
	.pipe(webserver({
		livereload : true,
		open : true
	}));
});


gulp.task('watch',function(){	
	//gulp.watch('build/dev/*.html', ['html']);	
	gulp.watch('build/dev/app/**/*.js', ['js']);	
	gulp.watch('build/dev/app/**/*.css', ['css']);
	//gulp.watch('build/dev/app/**/*.*', ['app']);
});

gulp.task('default', [
	'js',	
	'css',	
	'watch',
	'webserver'
	]);

