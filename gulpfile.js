const gulp = require('gulp');



gulp.task('hi' ,function () {
   //do thing
   console.log('測試test');  
});

gulp.task('copy' , function(){
   return gulp.src('dev/index.html').pipe(gulp.dest('dist'));
})