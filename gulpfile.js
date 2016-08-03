const babel = require('babelify')
const browserify = require('browserify')
const gulp = require('gulp')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');


gulp.task('jade', function() {
  return gulp.src('./src/index.jade')
  .pipe(jade({}))
  .pipe(gulp.dest('./build/'))
})

gulp.task('css', function () {
  return gulp.src('./src/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

function compile(watch) {
  var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }
  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', ['jade', 'css'], function() {
  return compile();
})

gulp.task('watch', function() {
  gulp.watch(['./src/css/**/*.scss', './src/index.scss'], ['css']);
  gulp.watch(['./src/index.jade'], ['jade']);
  return watch();
});

