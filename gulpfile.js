const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');



gulp.task('hi', function () {
    //do thing
    console.log('測試test');
});

gulp.task('copy', function () {
    return gulp.src('dev/index.html').pipe(gulp.dest('dist'));
})

//異步
gulp.task('css',['copy'] ,function () { //先執行 ['copy'] 這個function
    return gulp.src('dev/css/*.css')
    .pipe(cleanCSS({
        compatibility: 'ie8'
    })).pipe(gulp.dest('dist/css'))
})

//sass

gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss') //來源
      .pipe(sass().on('error', sass.logError)) //sass轉譯
      .pipe(gulp.dest('./dist/css')); //目的地
  });




//同步
  gulp.task('all' ,['copy' ,'css']);//同時執行 ['copy' ,'css'] 這兩個function


