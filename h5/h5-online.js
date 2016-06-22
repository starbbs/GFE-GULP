
// 张树垚 2015-12-10 15:05:15  创建
// gulp H5微信端 生成到public文件夹


var gulp = require('gulp');
var path = require('path');

var tools = require('../tools');
var paths = require('./h5-paths');

var uglify = require('gulp-uglify');
var replace = require('gulp-replace');

var version=(new Date()).valueOf();//版本号

gulp.task('h5-js', function() {
	return gulp.src(path.join(paths.build, '/js/*.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.online + '/js'))
});
gulp.task('h5-rjs', ['h5-js'], function() {
	return tools.rjs(paths.build + '/*.html', paths.online + '/js', {
		rjsPaths: paths.rjs,
		uglify: true,
		isOnline:true,
		oldChar: '172.16.33.3:18080',
		newChar: 'endpoint.goopal.com.cn',
		oldChar1: 'www.xiaojian.me',
		newChar1: 'www.goopal.com.cn',
		oldChar2: 'wxe91980c4944999fe',
		newChar2: 'wx55923db8dfb94e44',
		oldChar3: '172.16.33.10:8089',
		newChar3: 'track.goopal.com.cn',
		oldChar4:'exchange.xiaojian.me',
		newChar4: 'www.goopal.net.cn'

	});
});

gulp.task('h5-html', function() {
	return tools.html(paths.build + '/*.html', paths.online, {
		remove: '<script src="./js/config.js"></script>',
		oldChar: '.js',
		newChar: '.js?version='+version,
		oldChar1: '.css',
		newChar1: '.css?version='+version,
	});
});

gulp.task('h5-img', function() {
	return tools.fileMove(paths.build + '/images/**/**', paths.online + '/images', {
		type: 'image',
		imagemin: true,
		removeDirname: false
	});
});

gulp.task('h5-sprite', function() {
	return tools.cssSprite(path.join(paths.build, '/css/*.css'), {
		css: path.join(paths.online + '/css'),
		img: path.join(paths.online + '/images')
	})
});

gulp.task('h5-font', function() {
	return gulp.src(paths.build + '/font/**')
		.pipe(gulp.dest(paths.online + '/font'));
});


gulp.task('h5-online', ['h5-rjs', 'h5-html', 'h5-img', 'h5-sprite', 'h5-font']);

