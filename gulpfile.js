const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');



gulp.task('hi', function () {
    //do thing
    console.log('測試test');
});

gulp.task('copy', function () {
    return gulp.src('dev/index.html').pipe(gulp.dest('dist'));
})

//異步
gulp.task('css',['copy'] ,function () {
    return gulp.src('dev/css/reset.css')
    .pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(gulp.dest('dist/css'))
})

//
  gulp.task('all' ,['copy' ,'css']);//同步


