// 张树垚 2015-12-03 15:12:10 创建
// gulp sass编译
// 包括:
// 1. 自动补全autoprefixer
// 2. sourcemap

'use strict';

/**
 * [sass sass编译]
 * @Author   张树垚
 * @DateTime 2015-12-03 15:16:08
 * @param    {[string|array]}      input  [输入路径]
 * @param    {[string|funtion]}    output [输出路径]
 * @return   {[gulp-stream]}
 * @用法:
 * gulp.task('sass', function() {
 * 		return tools.sass('INPUT PATH', 'OUTPUT PATH');
 * });
 */
module.exports = function(input, output) {
	let gulp = require('gulp');
	let sass = require('gulp-ruby-sass');
	let autoprefixer = require('gulp-autoprefixer');
	let sourcemaps = require('gulp-sourcemaps');
	let removeDirname = require('./03 removeDirname 去掉文件夹路径.js');
	return sass(input, {
			// style: 'nested',
			// style: 'expanded',
			style: 'compact',
			// style: 'compressed',
			sourcemap: true
		})
		.on('error', sass.logError)
		.pipe(removeDirname())
		.pipe(autoprefixer('last 10 version'))
		.pipe(gulp.dest(output))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(output))
};