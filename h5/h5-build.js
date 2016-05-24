// 张树垚 2015-12-10 14:59:58 创建
// gulp H5微信端 生成到build文件夹


var gulp = require('gulp');
var path = require('path');

var browserSync = require('browser-sync').create();

var tools = require('../tools');
var paths = require('./h5-paths');


var notify = function(task, path) { // 提示
	var notice = (path && !Array.isArray(path) && tools.filePath(path).type !== 'dir') ? tools.filePath(path).filename + ' ' : '全部文件';
	return tools.notify(task + ': ' + notice + '编译完成!');
};


// html部分
gulp.task('h5-include', function() {
	var page = paths.pages + '/**/*.html';
	var todo = function(path) {
		return tools.fileInclude(path || page, paths.build, {
				strict: true
			})
			.pipe(browserSync.reload({ 
				stream: true
			}))
			.pipe(notify('h5-include', path));
	};
	gulp.watch(page, function(event) {
		var path = tools.filePath(event.path);
		return todo(path.path + '/' + path.dirname + '.' + path.extname);
	});
	gulp.watch([
		path.join(paths.source, '/include/*.html'),
		path.join(paths.views, '/**/*.html'),
		path.join(paths.dialogs, '/**/*.html'),
		path.join(paths.components, '/**/*.html')
	], function(event) {
		return todo();
	});
	return todo();
});


// sass部分
gulp.task('h5-sass', function() {
	var page = path.join(paths.pages, '/**/*.scss');
	var todo = function(url) {
		return tools.sass(url || page, path.join(paths.build, '/css'))
			.pipe(browserSync.reload({
				stream: true
			}))
			.pipe(notify('h5-sass', url));
	};
	gulp.watch(page, function(event) {
		return todo(event.path);
	});
	gulp.watch([
		path.join(paths.source, '/scss/**/*.scss'),
		path.join(paths.common, '/zSass/**/*.scss'),
		path.join(paths.views, '/**/*.scss'),
		path.join(paths.components, '/**/*.scss'),
		path.join(paths.dialogs, '/**/*.scss')
	], function(event) {
		return todo();
	});
	return todo();
});


// 图片部分
gulp.task('h5-img-move', function() {
	var todo = function(url, useReg) {
		var opts = {
			type: 'image',
			rename: function(url) {
				if (url.dirname !== '.') {
					var reg = new RegExp(path.sep + 'images', 'g');
					url.basename = url.dirname.replace(reg, '').replace(path.sep, '') + url.basename.replace(/^_+/, '-');
				}
			}
		};
		useReg && (opts.fileReg = /^_/);
		tools.fileMove(url, path.join(paths.build, '/images'), opts)
			.pipe(browserSync.reload({
				stream: true
			}))
			.pipe(notify('h5-img-move', url))
	};
	todo(path.join(paths.pages, '/**/**'), true);
	todo(path.join(paths.views, '/**/**'), true);
	todo(path.join(paths.source, '/images/**/**'));
	gulp.watch([
		path.join(paths.pages, '/**/**'),
		path.join(paths.views, '/**/**'),
		path.join(paths.source, '/images/**/**')
	], function(event) {
		var path = tools.filePath(event.path);
		if (path.type === 'image') {
			todo(path.origin, /\/pages\//.test(path.origin));
		}
	});
});


// js部分
gulp.task('h5-js-move', function() {
	var js = [path.join(paths.pages, '/**/*.js'), path.join(paths.common, '/library/base/*.js')];
	var todo = function(url) {
		return gulp.src(url)
			.pipe(tools.removeDirname())
			.pipe(gulp.dest(path.join(paths.build, '/js')))
			.pipe(browserSync.reload({
				stream: true
			}))
			.pipe(notify('h5-js-move', url))
	};
	gulp.watch(js, function(event) {
		return todo(event.path);
	});
	return todo(js);
	// var inputs = [
	// 	path.join(paths.pages, '/**/*.js'), // 页面对应js
	// 	path.join(paths.common, '/library/base/*.js') // 页面引入js
	// ];
	// return gulp.src(inputs, function() {
	// 	arguments[1].forEach(function(input, index, array) {
	// 		console.log(input);
	// 	});
	// });
	// var todo = function(url) {
	// 	return gulp.src(url)
	// 		.pipe(tools.removeDirname())
	// 		.pipe(gulp.dest(path.join(paths.build, '/js')))
	// 		.pipe(notify('h5-js-move', url))
	// };
	// todo(js);
	// gulp.watch(js, function(event) {
	// 	return todo(event.path);
	// });
});


// font部分
gulp.task('h5-font-build', function() {
	return gulp.src(path.join(paths.font, '*.*'))
		.pipe(gulp.dest(path.join(paths.build, 'font')))
});


// template部分 -- 慎用, name不清会覆盖原文档
gulp.task('h5-template', function() {
	var date = new Date();
	var opts = {
		name: '', // name一定要清空, 慎用!
		desc: '服务协议', // 描述'// H5微信端 --- {{desc}}'
		date: date.toLocaleDateString().replace(/\//g, '-') + ' ' + date.toTimeString().split(' ')[0]
	};
	return tools.template('../h5/source/template/**', '../h5/factory/pages', opts).pipe(tools.notify(opts.name + '模版已建立完成!'));
});


// 自动刷新
gulp.task('reload', function() {
	return browserSync.init({
		ui: {
			port: 8080,
			weinre: {
				port: 9090
			}
		},
		server: {
			baseDir: '../'
		}
	});
});


gulp.task('h5-build', ['h5-include', 'h5-sass', 'h5-img-move', 'h5-js-move', 'h5-font-build'], function() {
	gulp.start('reload');
});