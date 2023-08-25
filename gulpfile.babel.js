import gulp from 'gulp';
import del from 'del';
import image from 'gulp-image';
import connect from 'gulp-connect-php';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import miniCSS from 'gulp-csso';
import bro from 'gulp-bro';
import babelify from 'babelify';
import nodeSass from 'node-sass';
import gulpSass from 'gulp-sass';
// import concat from 'gulp-concat';

const sass = gulpSass(nodeSass);

const routes = {
    txt: {
        watch: 'src/**/*.txt',
        src: 'src/**/*.txt',
        dest: './',
    },
    json: {
        watch: 'src/**/*.json',
        src: 'src/**/*.json',
        dest: './',
    },
    php: {
        watch: 'src/**/*.php',
        src: 'src/**/*.php',
        dest: './',
    },
    fonts: {
        watch: 'src/fonts/*',
        src: 'src/fonts/*',
        dest: './fonts',
    },
    img: {
        watch: 'src/img/*',
        src: 'src/img/*',
        dest: './img',
    },
    scss: {
        watch: 'src/scss/**/*.scss',
        src: 'src/scss/styles.scss',
        dest: './css',
    },
    js: {
        // watch: 'src/js/**/*.js',
        // src: 'src/js/main.js',
        // dest: './js',
        watch: 'src/**/*.js',
        src: 'src/**/*.js',
        dest: './',
    },
};

const connectSync = () =>
    connect.server({}, () => {
        browserSync({
            proxy: '127.0.0.1:8000',
        });
    });

const clean = () => del(['./js', './css', './view', './img', './fonts']);

const php = () =>
    gulp
        .src(routes.php.src)
        .pipe(gulp.dest(routes.php.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );

const txt = () =>
    gulp
        .src(routes.txt.src)
        .pipe(gulp.dest(routes.txt.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );

const json = () =>
    gulp
        .src(routes.json.src)
        .pipe(gulp.dest(routes.json.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );

const fonts = () =>
    gulp
        .src(routes.fonts.src)
        .pipe(gulp.dest(routes.fonts.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );

const img = () =>
    gulp
        .src(routes.img.src)
        .pipe(image())
        .pipe(gulp.dest(routes.img.dest))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );

const stylesForDev = () =>
    gulp.src(routes.scss.src).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(routes.scss.dest));

const jsForDev = () => gulp.src(routes.js.src).pipe(gulp.dest(routes.js.dest));

const styles = () =>
    gulp
        .src(routes.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(miniCSS())
        .pipe(gulp.dest(routes.scss.dest));

const js = () =>
    gulp
        .src(routes.js.src)
        // .pipe(concat('main.js'))
        .pipe(
            bro({
                transform: [
                    babelify.configure({ presets: ['@babel/preset-env'], plugins: [['@babel/transform-runtime']] }),
                    ['uglifyify', { global: true }],
                ],
            })
        )
        .pipe(gulp.dest(routes.js.dest));

const watchToDev = () => {
    gulp.watch(routes.php.watch, php);
    gulp.watch(routes.txt.watch, txt);
    gulp.watch(routes.json.watch, json);
    gulp.watch(routes.fonts.watch, fonts);
    gulp.watch(routes.img.watch, img);
    gulp.watch(routes.scss.watch, stylesForDev);
    gulp.watch(routes.js.watch, jsForDev);
};

const watch = () => {
    gulp.watch(routes.php.watch, php);
    gulp.watch(routes.txt.watch, txt);
    gulp.watch(routes.json.watch, json);
    gulp.watch(routes.fonts.watch, fonts);
    gulp.watch(routes.img.watch, img);
    gulp.watch(routes.scss.watch, styles);
    gulp.watch(routes.js.watch, js);
};

const prepare = gulp.series([clean, img, php, txt, fonts, json]);

const processToDev = gulp.series([stylesForDev, jsForDev]);
const processToPublish = gulp.series([styles, js]);

const liveToDev = gulp.parallel([connectSync, watchToDev]);
const live = gulp.parallel([connectSync, watch]);

export const buildToDev = gulp.series([prepare, processToDev]);
export const dev = gulp.series([buildToDev, liveToDev]);

export const buildToPublish = gulp.series([prepare, processToPublish]);
export const publish = gulp.series([buildToPublish, live]);
