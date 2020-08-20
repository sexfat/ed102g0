const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const reload = browserSync.reload;



gulp.task('hi', function () {
    //do thing
    console.log('測試test');
});

gulp.task('copy', function () {
    return gulp.src('dev/index.html').pipe(gulp.dest('dist'));
})

//異步
gulp.task('css', ['copy'], function () { //先執行 ['copy'] 這個function
    return gulp.src('dev/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        })).pipe(gulp.dest('dist/css'))
})

//sass

gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss') //來源
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError)) //轉譯sass
        .pipe(cleanCSS({
            compatibility: 'ie8'
        })) // 壓縮css
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css')); //目的地
});



//打包
gulp.task('concat', ['sass'], function () {
    return gulp.src('dist/css/*.css') //來源
        .pipe(concat('all.css')) //合併
        .pipe(gulp.dest('dist/css/all')) //目的地
})


//html 
gulp.task('fileinclude', function () {
    return gulp.src(['dev/*.html']) //來源
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist')); //目的地
});



//監看變動
gulp.task('watch', function () {
    gulp.watch('./dev/sass/*.scss', ['sass', 'concat']);
    gulp.watch(['dev/*.html', 'dev/**/*.html'], ['fileinclude']);
});


//壓圖
gulp.task('img', function () {
    gulp.src('./dev/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
})


//es6 -> es5
gulp.task('babels', () =>
    gulp.src('dev/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist/js'))
);


//清除舊檔案
gulp.task('clear', function () {
    return gulp.src('dist', {read: false ,allowEmpty: true})
        .pipe(clean());
});





//瀏覽器同步
gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        }
    });
    gulp.watch('./dev/sass/*.scss', ['sass', 'concat']).on('change', reload);
    gulp.watch(['dev/*.html', 'dev/**/*.html'], ['fileinclude']).on('change', reload);
    gulp.watch('dev/js/*.js' , ['babels']).on('change', reload);
});


//同步
gulp.task('production', ['sass', 'concat' , 'fileinclude' ,'babels']); //同時執行 ['copy' ,'css'] 這兩個function