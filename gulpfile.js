const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');


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
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('browser-reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('watchers', () => {
    gulp.watch('dist/*.html', gulp.parallel('browser-reload'));
    gulp.watch('dev/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('default', gulp.parallel('browser-sync', 'scss', 'watchers'), () => {

});