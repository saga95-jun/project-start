global.$ = {
	//Пакеты
	gulp: require('gulp'),
	gp: require('gulp-load-plugins')(),
	browserSync : require("browser-sync").create(),

	// Конфигурации
	path : require("./config/path.js"),
	app : require("./config/app.js")
};


const html = require("./tasks/html.js");
const clear = require("./tasks/clear.js");
const scss = require("./tasks/scss.js");
const js = require("./tasks/js.js");
const img = require("./tasks/img.js");
const font = require("./tasks/font.js");
const server = require("./tasks/server.js");


const watcher = () => {
	$.gulp.watch($.path.html.watch, html).on('all', $.browserSync.reload);
	$.gulp.watch($.path.scss.watch, scss).on('all', $.browserSync.reload);
	$.gulp.watch($.path.js.watch, js).on('all', $.browserSync.reload);
	$.gulp.watch($.path.img.watch, img).on('all', $.browserSync.reload);
	$.gulp.watch($.path.font.watch, font).on('all', $.browserSync.reload);
};

const build = $.gulp.series(
	clear,
	$.gulp.parallel(html, scss, js, img, font)
);



const dev = $.gulp.series(
	build,
	$.gulp.parallel(watcher, server)
);

exports.watch = watcher;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;

exports.default = $.app.isProd ? build : dev;


