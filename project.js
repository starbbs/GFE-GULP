
// 张树垚 2016-03-30 10:10:21 创建
// GULP --- Project类


var gulp = require('gulp');


var Project = function(name, options) {
	this.name = name;
	this.options = options;
	for (var i in options) {
		if (i in Project.prototype) {
			Project.prototype[i].apply(this, options[i]);
		} else {
			console.log('error: ' + i + '并不存在于Project原型中');
		}
	}
};
Project.prototype = {
	init: function() { // 初始化

	},
	// build
	scss: function() { // sass编译

	},
	'css-move': function() { // css转移

	},
	'img-move': function() { // 图片转移

	},
	'js-move': function() { // js转移

	},
	include: function() { // html生成

	},
	// public
	rjs: function() { // requirejs合并

	},
	js: function() { // js处理(压缩)

	},
	'css-sprite': function() { // 雪碧图合并

	},
	css: function() { // css处理(压缩)

	},
	html: function() { // html处理(压缩)

	},
	img: function() { // 图片处理(压缩)

	},
};


