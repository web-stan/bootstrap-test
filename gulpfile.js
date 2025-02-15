let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('clean', async function(){
  del.sync('dist');
});

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('export', function(cb){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));   

  cb();
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css' ,'scss', 'browser-sync', 'watch'));