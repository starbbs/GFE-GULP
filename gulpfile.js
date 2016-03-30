// 张树垚 2015-09-21 16:37:50 创建
// gulp -- 我是工人阶级
var gulp = require("gulp");
var tools = require('./tools');

// H5微信端
require('./h5/h5-build');
require('./h5/h5-public');
gulp.task('h5', ['h5-build']);

// 任务
gulp.task('default', ['h5']);














