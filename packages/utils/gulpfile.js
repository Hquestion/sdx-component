const gulp = require('gulp');

gulp.task('copy', function() {
    return gulp.src('src/theme-common/**/*.*')
        .pipe(gulp.dest('lib/theme-common'));
});
