// 张树垚 2016-04-18 17:11:27 创建
// project --- 任务命名


let gulp = require('gulp');

let list = [];
let exist = function(name) {
	if (list.indexOf(name) > -1) {
		let match = name.match(/(.+)\-(\d+)/);
		let num = 1;
		if (match) {
			name = match[1];
			num = parseInt(match[2]) + 1;
		}
		return maker(name + '-' + num);
	} else {
		list.push(name);
		return name;
	}
};

let task = function(name = 'default', need = [], todo) {
	gulp.task(exist(name), need, todo);
};
task.list = list;
task.exist = exist;


module.exports = task;
