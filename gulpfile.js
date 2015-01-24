var gulp = require("gulp"),
	gutil = require("gulp-util"),
	sass = require("gulp-ruby-sass"),
	uglify = require("gulp-uglify"),
	watch = require("gulp-watch"),
	concat = require("gulp-concat"),
	notify = require("gulp-notify"),
	browserSync = require("browser-sync"),
	autoprefixer = require("gulp-autoprefixer"),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html');
	// sourcemaps = require("gulp-sourcemaps")


gulp.task("sass", function() {
	return gulp.src("styles/style.sass")
	.pipe(sass())
	// .pipe(sourcemaps.init())
	// .pipe(autoprefixer({
 //            browsers: ['last 2 versions'],
 //            cascade: false
 //        }))
	// .pipe(sourcemaps.write('.'))
	.pipe(gulp.dest("styles"))
	// .pipe(notify({
	// 	message: "sass files compiled successfully!"
	// }))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('gulp-autoprefixer');

    return gulp.src('styles/*.css')
        // .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});

gulp.task("browser-sync", function() {
	return browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task("bs-reload", function() {
	return browserSync.reload();
})

gulp.task("watch", function() {
	// gulp.watch("styles/*.sass", ["sass", "autoprefixer"]);
	gulp.watch("styles/*.sass", ["sass"]);
	gulp.watch("*.html", ["bs-reload"]);
	gulp.watch("js/*.js", ["bs-reload"]);
});

gulp.task("minify-css", function() {
	return gulp.src(["bower_components/bootstrap/dist/css/bootstrap.min.css", "styles/style.css"])
	.pipe(concat("style.css"))
	.pipe(minifyCSS())
	.pipe(gulp.dest("dist/styles"));
});

gulp.task('minify-html', function() {
    var opts = {comments:false,spare:true,empty:true};

	return gulp.src('*.html')
    	.pipe(minifyHTML(opts))
    	.pipe(gulp.dest('dist'));
});

gulp.task("build", ["minify-css", "minify-html"]);

gulp.task("default", ["watch", "browser-sync"]);