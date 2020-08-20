const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');




function logs(cb){
//do
  console.log('HI Gulp4');
cb();
}

exports.default = logs;


function missionA(cb) {
    console.log('missionA');
    cb();
}

function missionB(cb) {
    console.log('missionB');
    cb();
}
// 異步
exports.async = series(missionA , missionB);
//同步
exports.sync = parallel(missionA , missionB);


 function copy(cb){
   return src(['dev/*.html' ,'!dev/a*.html']).pipe(dest('dist/'));
 cb();
}
//輸出
exports.move = copy


