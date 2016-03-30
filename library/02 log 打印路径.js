// 张树垚 2015-12-02 16:09:02 创建
// gulp工具 -- 打印路径

'use strict';

/**
 * [log 打印路径]
 * @Author   张树垚
 * @DateTime 2015-12-02 16:13:23
 * @return   {[gulp-stream]}
 * @用法:
 * .pipe(tools.log())
 */
module.exports = function() {
	let rename = require('gulp-rename');
	return rename(function(path) {
		console.log(path);
	});
};