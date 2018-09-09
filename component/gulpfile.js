const gulp = require('gulp');
const gulpSvelte = require('gulp-svelte');
const gulpWatch = require('gulp-watch');
// const gulpMinify = require('gulp-minify');
// var rename = require("gulp-rename");

/* MENU USER */
gulp.task('menuUser', function () {
	return gulpWatch('src/menuUser.html', { ignoreInitial: false }, function () {
		gulp.src('src/menuUser.html')
			.pipe(gulpSvelte({
				format: 'iife',
				filename: 'menuUser.html',
				name: 'MenuUser'
			}))
			.pipe(gulp.dest('dist'))
	});
});
/* END MENU USER */

/*  LIST MESS */
gulp.task('listMess', function () {
	return gulpWatch('src/listMess.html', { ignoreInitial: false }, function () {
		gulp.src('src/listMess.html')
			.pipe(gulpSvelte({
				format: 'iife',
				filename: 'listMess.html',
				name: 'ListMess'
			}))
			.pipe(gulp.dest('dist'))
	});
});
/* END LIST MESS */

/*  LIST LOGIN */
gulp.task('login', function () {
	return gulpWatch('src/login.html', { ignoreInitial: false }, function () {
		gulp.src('src/login.html')
			.pipe(gulpSvelte({
				format: 'iife',
				filename: 'login.html',
				name: 'Login'
			}))
			.pipe(gulp.dest('dist'))
	});
});
/* END LIST LOGIN */

