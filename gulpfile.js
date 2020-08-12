var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
// var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var reload = browserSync.reload;

//路徑
var web = {
  sass: [
      './sass/*.scss',
      '.sass/**/*.scss'

  ],
  html: [
      '*.html',
      './**/*.html'
  ],
  js: [
      'js/*.js',
      'js/**/*.js'
  ],
  assets: [
      'assets/fonts/*',
      'assets/images/*',
      'assets/js/*',
      'assets/css/*',
  ],
  json: [
      'dev/body/*.json'
  ],
  tmp: 'resources/assets/tmp/css/*.css'
};



//主程式
gulp.task('test', function () {
  return  gulp.src('js/*.js')
    .pipe(gulp.dest('dest/js'));
});

//concat 檔案合併
gulp.task('concat', function () {
  return  gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dest/js'));
    
});


//印在我 cmd
gulp.task('hello', function () {
  console.log('Hello Gulp.js');
});


// css 前綴字 autoprefixer
gulp.task('style', function () {
  return gulp.src('css/*.css')
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('dest/css'))
});

//css postcss

// gulp.task('postcss', function () {
//     var plugins = [
//         autoprefixer({
//             broswer: ['last 1 vrsion']
//         })
//     ];
//     return gulp.src('css/*.css')
//         .pipe(postcss(plugins))
//         .pipe(gulp.dest('./dest/css/autoprefixer/'));
// });



// minify-css 壓縮css

gulp.task('minicss', ['hello'], function () {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest/css'));
});


//sass
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'));
});


// watch 監看變動

gulp.task('watch', function () {
  gulp.watch('css/*.css', ['minicss']);
  gulp.watch(['./*.html', './**/*.html'], ['fileinclude']);
});


// html 樣板
gulp.task('fileinclude', function () {
  gulp.src(['*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    
    .pipe(gulp.dest('./dest'));
});


gulp.task('img_mini', function () {
  gulp.src('images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images'))
});


gulp.task('default', function () {

  browserSync.init({
      server: {
          baseDir: "./dest",
          index: "index.html"
      }
  });

  gulp.watch(web.sass, ['sass']).on('change', reload);
  gulp.watch(web.js).on('change', reload);
  gulp.watch(web.html, ['fileinclude']).on('change', reload);
  
});