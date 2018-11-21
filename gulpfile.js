const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');


gulp.task('scss', () => {
    return gulp
        .src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(
            autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
                cascade: true
            })
        )
        .pipe(cssnano())
        .pipe(gulp.dest('public/stylesheets'))

});

gulp.task('watchers', () => {
    gulp.watch('dev/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('dev/js/**/*.js', gulp.series('scripts'));

});

gulp.task('scripts', () =>
    gulp
        .src([
            'dev/js/auth.js'
            //
        ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts'))
);

gulp.task('default', gulp.parallel('scss', 'scripts', 'watchers'), () => {

});