var gulp = require("gulp"),
	gutil = require("gulp-util"),
	sass = require("gulp-ruby-sass"),
	uglify = require("gulp-uglify"),
	watch = require("gulp-watch"),
	concat = require("gulp-concat"),
	notify = require("gulp-notify"),
	browserSync = require("browser-sync");


gulp.task("sass", function() {
	gulp.src("styles/style.sass")
	.pipe(sass())
	.pipe(gulp.dest("styles"))
	.pipe(notify({
		message: "sass files compiled successfully!"
	}))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task("browser-sync", function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("bs-reload", function() {
	browserSync.reload();
})

gulp.task("watch", function() {
	gulp.watch("styles/*.sass", ["sass"]);
	gulp.watch("*.html", ["bs-reload"]);
	gulp.watch("js/*.js", ["bs-reload"]);
});

gulp.task("default", ["watch", "browser-sync"]);