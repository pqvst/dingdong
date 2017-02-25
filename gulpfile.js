const gulp = require("gulp");
const minifyCss = require("gulp-minify-css");
const uglify = require("gulp-uglify");
 
// task
gulp.task("default", function () {
    gulp.src("./dingdong.css") // path to your file
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist/'));
	gulp.src("./dingdong.js")
		.pipe(uglify({ output: { ascii_only: true } }))
		.pipe(gulp.dest("./dist/"));
});