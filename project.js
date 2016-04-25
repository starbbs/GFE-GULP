// 张树垚 2016-03-30 10:10:21 创建
// GULP --- Project类



let gulp = require('gulp');

let task = require('./project_modules/task');


// new Project('h5', {
// 	include: ['path1', 'path2', {}]
// });



let Project = function(name = '', options = {}) {
	this.name = name;
	if (Object.keys(options).length) {
		this.init(options);
	}
};
Project.prototype = {
	init: function(options = {}) { // 初始化
		this.options = options;
		Object.keys(options).forEach(function(key) {
			if (key in this) {
				this[key].apply(this, options[key]);
			} else {
				console.log('Error: (Project) ' + i + '并不存在于Project原型中');
			}
		}.bind(this));
	},
	_input: function(input) { // 处理input, 分为main和watch项
		// input = '';
		// input = [];
		// input = {
		// 	main: [], // 主
		// 	watch: [],
		// };
		let inputPath = { // 整理路径
			main: [],
			watch: [],
		};
		if (typeof input === 'string') {
			inputPath.main.push(input);
		} else if (Array.isArray(input)) {
			inputPath.main = input;
		} else {
			inputPath.main = inputPath.main.concat(input.main);
			inputPath.watch = inputPath.watch.concat(input.watch);
		}
		console.log(inputPath);
		return inputPath;
	},
	_removeDir: function() {
		let rename = require('gulp-rename');
		return rename(function(path) {
			path.dirname = '';
		});
	},
	_build: function(taskName, options, todo) { // 创建build任务
		let defaultGroups = [this.name + '-build', 'build'];
		options.groups = options.groups ? options.groups.concat(defaultGroups) : defaultGroups;
		task.add(this.name + '-' + taskName, options.need, todo, options);
	},
	// build
	sass: function(input, output, options = {}) { // sass编译
		let {
			main,
			watch
		} = this._input(input);
		let sass = require('gulp-ruby-sass');
		let autoprefixer = require('gulp-autoprefixer');
		let sourcemaps = require('gulp-sourcemaps');
		let todo = function(input = main) {
			return sass(input, {
					// style: 'nested',
					// style: 'expanded',
					style: 'compact',
					// style: 'compressed',
					sourcemap: true
				})
				.on('error', sass.logError)
				.pipe(this._removeDir())
				.pipe(autoprefixer('last 10 version'))
				.pipe(gulp.dest(output))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(output))
		}.bind(this);
		this._build('sass', options, function() {
			watch.length && gulp.watch(watch, function(event) {
				todo()
			});
			main.length && gulp.watch(main, function(event) {
				todo(event.path);
			});
			return todo();
		});
	},
	'css-move': function(input, output, options = {}) { // css转移
		options.groups = options.groups || [this.name + '-build', 'build'];
		task.add(this.name + '-sass', options.need, function() {

		}, options);
	},
	'img-move': function(input, output, options = {}) { // 图片转移
		options.groups = options.groups || [this.name + '-build', 'build'];
		task.add(this.name + '-sass', options.need, function() {

		}, options);
	},
	'js-move': function(input, output, options = {}) { // js转移
		options.groups = options.groups || [this.name + '-build', 'build'];
		task.add(this.name + '-sass', options.need, function() {

		}, options);
	},
	include: function(input, output, options = {}) { // html生成
		options.groups = options.groups || [this.name + '-build', 'build'];
		task.add(this.name + '-sass', options.need, function() {

		}, options);
	},
	// public
	rjs: function(input, output, options = {}) { // requirejs合并

	},
	js: function(input, output, options = {}) { // js处理(压缩)

	},
	'css-sprite': function(input, output, options = {}) { // 雪碧图合并

	},
	css: function(input, output, options = {}) { // css处理(压缩)

	},
	html: function(input, output, options = {}) { // html处理(压缩)

	},
	img: function(input, output, options = {}) { // 图片处理(压缩)

	},
};


module.exports = Project;