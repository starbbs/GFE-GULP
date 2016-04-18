
// 张树垚 2016-03-30 10:10:21 创建
// GULP --- Project类



let gulp = require('gulp');


// new Project('h5', {
// 	include: ['path1', 'path2', {}]
// });

let taskList = [];
let taskExist = function(name, suffix = 0) {
	if (taskList.indexOf(name) > -1) {
		let tail = name.substr(name.lastIndexOf('-') + 1);
		let num = parseInt(tail);
		if (isNaN(num)) {
			taskList.push(name + '-1');
			return name + '-1';
		} else {
			num++; // 加在后面
			return taskExist(name, num);
			// 加在中间空挡
			// suffix++;
			// return taskExist(name, suffix);
		}
	} else {
		taskList.push(name);
		return name;
	}
};

taskExist('a');
taskExist('a');
taskExist('a');

console.log(taskList)


let taskMaker = function(name, need = [], todo) {
	gulp.task(taskExist(name), need, function() {});
};

let Project = function(name = '', options = {}) {
	this.name = name;
	this.options = options;
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
	// build
	sass: function(input, output, options) { // sass编译

	},
	'css-move': function(input, output, options) { // css转移

	},
	'img-move': function(input, output, options) { // 图片转移

	},
	'js-move': function(input, output, options) { // js转移

	},
	include: function(input, output, options) { // html生成

	},
	// public
	rjs: function(input, output, options) { // requirejs合并

	},
	js: function(input, output, options) { // js处理(压缩)

	},
	'css-sprite': function(input, output, options) { // 雪碧图合并

	},
	css: function(input, output, options) { // css处理(压缩)

	},
	html: function(input, output, options) { // html处理(压缩)

	},
	img: function(input, output, options) { // 图片处理(压缩)

	},
};


