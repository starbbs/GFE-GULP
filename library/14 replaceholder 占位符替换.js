// 张树垚 2016-03-30 17:25:20 创建
// gulp工具 --- 占位符替换

'use strict';

// var reg = ;
// var replace = function(json) {
// 	for (var i in json) {
// 		var match = json[i].match(reg);
// 		var name = match ? match[1] : '';
// 		if (name && name in paths) {
// 			console.log(paths[name])
// 			json[i].replace(reg, paths[name]);
// 		} else {
// 			console.log('error: ' + name + '在paths中不存在!');
// 		}
// 	}
// };



let replaceholder = function(str = '', json = {}, reg = /\{\{([^\}]*)\}\}/g, index = 1) {
	let todo = (typeof str === 'string' ? str : JSON.stringify(str)).replace(reg, function() {
		let name = arguments[index];
		if (name in json) {
			return json[name];
		} else {
			return arguments[0];
		}
	});
	return (typeof str === 'string' ? todo : JSON.parse(todo));
};

module.exports = replaceholder;