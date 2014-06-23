var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('deploy', ['clean', 'build'], function () {
    gulp.src("./dist/**/*")
        .pipe($.ghPages());
});
