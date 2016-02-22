var gulp        = require('gulp'),
    handlebars  = require('gulp-handlebars'),
    wrap        = require('gulp-wrap'),
    declare     = require('gulp-declare'),
    watch       = require('gulp-watch'),
    sass        = require('gulp-sass'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    postcss     = require('gulp-postcss'),
    autop       = require('autoprefixer'),
    cssnano     = require('gulp-cssnano'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    changed     = require('gulp-changed');


var source = {
    path:       'source/',
    templates:  'source/templates/*.hbs',
    scripts:    'source/scripts/*.js',
    vendors:    'source/vendors/*.js',
    sass:       'source/sass/**/*.*',
    images:     'source/images/*.{gif,jpg,png,svg}'
};

var dist = {
    path:       'dist/',
    scripts:    'dist/scripts/',
    styles:     'dist/styles/',
    images:     'dist/images/'
};

// Templates HBS
gulp.task('hbs', function() {
    return gulp.src(source.templates)
        .pipe(changed( dist.scripts ))
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(dist.scripts));
});

// JS app
gulp.task('js_app', function() {
    gulp.src(source.scripts)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat("app.js"))
        .pipe(gulp.dest(dist.scripts));
});

// JS libs
gulp.task('js_libs', function() {
    gulp.src(source.vendors)
        .pipe(concat("vendors.js"))
        .pipe(uglify())
        .pipe(gulp.dest(dist.scripts));
});

// SASS
gulp.task('sass', function() {
    return gulp.src(source.sass)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(changed( dist.styles ))
        .pipe(sass({
            indentedSyntax: false
        }))
        .pipe(concat("style.css"))
        .pipe(gulp.dest(dist.styles));
});

// Image minifier
gulp.task('image_min', function() {
    return gulp.src(source.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(dist.images));
});

// Build
gulp.task('build', ['hbs', 'js_app', 'js_libs', 'sass', 'image_min']);
gulp.task('default',['hbs', 'js_app', 'sass']);

// Watch
gulp.task('watch', function() {
    gulp.watch(source.vendors, ['js_libs']);
    gulp.watch(source.scripts, ['js_app']);
    gulp.watch(source.sass, ['sass']);
    gulp.watch(source.templates, ['hbs']);
});