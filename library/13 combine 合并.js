// 张树垚 2016-03-30 13:59:15 创建
// gulp工具 -- 对象合并(浅拷贝)

'use strict';

module.exports = function(donotJump) {
	let args;
	if (typeof donotJump === 'boolean') {
		args = Array.prototype.slice.call(arguments, 1);
	} else {
		args = Array.prototype.slice.call(arguments, 0);
		donotJump = false;
	}
	return args.reduce(function(res, amd) {
		for (let i in amd) {
			if (i in res && !donotJump) {
				console.log('error: ' + i + '已存在,跳过合并');
			} else {
				res[i] = amd[i];
			}
		}
		return res;
	}, {});
};