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
	minifyHTML = require('gulp-minify-html'),
	es = require("event-stream"),
	order = require("gulp-order"),
	jshint = require("gulp-jshint");
	// sourcemaps = require("gulp-sourcemaps")

var jQuery = "bower_components/jquery/dist/jquery.min.js",
	bootstrapJs = "bower_components/bootstrap/dist/js/bootstrap.min.js", 
	mainJs = "js/main.js";

var jsDependencies = [jQuery, bootstrapJs, mainJs];
 
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

gulp.task("minify-js", function() {

	// var main = gulp.src(jsDependencies[jsDependencies.length-1])
	// 			.pipe(jshint())
	// 			.pipe(uglify());

	// var libs = gulp.src(jsDependencies.slice(0,jsDependencies.length-1))
	// 			.pipe(order(jsDependencies));

	// return es.merge(libs, main)
	// 		.pipe(order(jsDependencies))
	// 		.pipe(concat("main.js"))
	// 		.pipe(gulp.dest("dist/js"));

	// console.log(jsDependencies);

	return gulp.src(jsDependencies)
			.pipe(order(jsDependencies))
			.pipe(jshint())
			.pipe(uglify())
			.pipe(concat("main.js"))
			.pipe(gulp.dest("dist/js"));
});

gulp.task("build", ["minify-css", "minify-html", "minify-js"]);

gulp.task("default", ["watch", "browser-sync"]);