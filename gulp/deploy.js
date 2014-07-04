var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('deploy', ['build'], function () {
    return gulp.src("./dist/**/*")
        .pipe(string_src('CNAME', 'timer.fedr.co'))
        .pipe($.using())
        .pipe($.ghPages());
});

function string_src(filename, string) {
    var src = require('stream').Transform({ objectMode: true })
    src._transform = function (chunk, encoding, callback) {
        this.push(chunk);
        callback();
    };
    src._flush = function(callback) {
        this.push(new $.util.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
        callback();
    };
    return src
}

