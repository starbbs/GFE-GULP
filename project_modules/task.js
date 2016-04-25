// 张树垚 2016-04-18 17:11:27 创建
// project --- 任务命名


let gulp = require('gulp');

let Task = function() {
	this.list = [];    // 任务列表
	this.groups = {};  // 任务分组
};
/**
 * [name 命名任务, 返回任务名]
 * @Author   张树垚
 * @DateTime 2016-04-24
 * @param    {string}      name      [要创建的任务名]
 * @return   {string}                [被创建的任务名]
 * @例:
 *   1. list=[], name('a')              => list=['a'], 返回'a'
 *   2. list=['a'], name('b')           => list=['a','b'], 返回'b'
 *   3. list=['a','b'], name('a')       => list=['a','a-1','b'], 返回'a-1'
 *   4. list=['a','a-1','b'], name('a') => list=['a','a-1','a-2','b'], 返回'a-2'
 */
Task.prototype.name = function(name) {
	if (this.list.indexOf(name) > -1) {
		let match = name.match(/(.+)\-(\d+)/);
		let num = 1;
		if (match) {
			name = match[1];
			num = parseInt(match[2]) + 1;
		}
		return maker(name + '-' + num);
	} else {
		this.list.push(name);
		return name;
	}
};
/**
 * 添加一个任务到分组
 * @Author   张树垚
 * @DateTime 2016-04-24
 * @param    {String}                 group 分组名称
 * @param    {String}                 name  任务名
 */
Task.prototype.addToGroup = function(group, name) {
	this.groups[group] ? this.groups[group].push(name) : (this.groups[group] = [name]);
};
/**
 * 设置分组任务
 * @Author   张树垚
 * @DateTime 2016-04-24
 * @注意:
 *   如果使用分组, 必须在最后执行一次该方法
 *   如果分组名和任务名重复, 会覆盖重名任务
 */
Task.prototype.initGroups = function() {
	Object.keys(this.groups).forEach(function(group) {
		if (this.list.indexOf(group) > -1) {
			console.log('Warning: (task) 分组' + group + '已存在于任务列表中, 即将覆盖原任务');
		}
		gulp.task(group, this.groups[group]);
	}.bind(this));
};
/**
 * [add 添加任务]
 * @Author   张树垚
 * @DateTime 2016-04-24
 * @param    {String}                 name           任务名
 * @param    {Array}                  need           任务依赖
 * @param    {Function}               todo           任务功能
 * @param    {Object}                 options        任务配置
 * @param    {String}                 options.group  任务分组
 * @param    {Array}                  options.groups 任务分组
 * @return   {String}                                返回真实注册的任务名
 * @注意:
 *   不会覆盖同名任务, 会加后缀区分
 */
Task.prototype.add = function(name = 'default', need = [], todo, options = {}) {
	name = this.name(name);
	if (options.group) {
		this.addToGroup(options.group, name);
	}
	if (options.groups) {
		options.forEach(function(group) {
			this.addToGroup(group, name);
		}.bind(this));
	}
	gulp.task(this.name(name), need, todo);
	return name;
};



module.exports = new Task();
