// 张树垚 2016-04-10 13:40:17 创建
// refresh -- 页面自动刷新


module.exports = function() {
	var browserSync = require('browser-sync');
	// 配置browserSync服务器
	var server = browserSync.create();
	server.watch('./build/css/*.css', function(event) {
		if (event === 'change') {
			server.reload('*.css');
		}
	});
	server.watch('./build/js/*.js', function(event) {
		if (event === 'change') {
			server.reload('*.js');
		}
	});
	server.init({
		// server: {
		// 	baseDir: './build',
		// 	index: 'index.html'
		// },
		proxy: 'http://123.59.66.74:8088/', // 代理, 和server不能同时使用
		serveStatic: ['./build'],
	});
};


