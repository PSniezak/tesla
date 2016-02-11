var gulp       = require('gulp'),
    handlebars = require('gulp-handlebars'),
    wrap       = require('gulp-wrap'),
    declare    = require('gulp-declare'),
    watch      = require('gulp-watch'),
    sass      = require('gulp-sass'),
    concat     = require('gulp-concat');


var source = {
    path: 'source/',
    templates: 'source/templates/*.hbs',
    scripts: 'source/scripts/*.js',
    vendors: 'source/vendors/*.js',
    sass:    'source/sass/*.scss'
};

var dist = {
    path: 'dist/',
    scripts: 'dist/scripts/',
    stylesheets: 'dist/stylesheets/'
}

// Listen changes /watch
gulp.task('watch', function() {
  gulp.watch( source.vendors, ['js_libs']);
  gulp.watch( source.scripts, ['js_app']);
  gulp.watch( source.sass, ['sass']);
  gulp.watch( source.templates, ['bhs']);
});

// Templates HBS
gulp.task('hbs', function() {
    return gulp.src(source.templates)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true,
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(dist.scripts));
});

// JS app
gulp.task('js_app', function() {
    gulp.src(source.scripts)
        .pipe(concat("app.js"))
        .pipe(gulp.dest(dist.scripts));
});

// JS libs
gulp.task('js_libs', function() {
    gulp.src(source.vendors)
        .pipe(concat("vendors.js"))
        .pipe(gulp.dest(dist.scripts));
});

// SASS
gulp.task('sass', function(){
  return gulp.src(source.sass)
        .pipe(sass({
          indentedSyntax: false
        }))
        .pipe(concat("style.css"))
        .pipe(gulp.dest(dist.stylesheets))
});

gulp.task('default', ['hbs', 'js_app', 'js_libs', 'sass','watch']);