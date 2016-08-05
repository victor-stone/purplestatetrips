var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');

gulp.task( 'js', () => {
   const opts = {
      entries: 'src/app.js'
    };

    return browserify(opts)
      .bundle()
      .pipe(source('purplestatetrips.js'))
      .pipe(gulp.dest('public/js'));
  });
