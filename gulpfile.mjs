import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const sass = gulpSass(dartSass);

export function styles() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}

export function scripts() {
  return gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
}

export function images() {
  return gulp.src('src/images/**/*.{png,jpg,jpeg,svg,webp,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

export function watch() {
  gulp.watch('src/styles/**/*.scss', styles);
  gulp.watch('src/scripts/**/*.js', scripts);
  gulp.watch('src/images/**/*', images);
}

export const build = gulp.series(
  gulp.parallel(styles, scripts, images)
);

export default gulp.series(
  gulp.parallel(styles, scripts, images),
  watch
);
