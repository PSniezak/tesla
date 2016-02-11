var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

var source = {
    path: 'source/',
    templates: 'source/templates/*.hbs',
    scripts: 'source/scripts/*.js',
    vendors: 'source/vendors/*.js'
};

var dist = {
    path: 'dist/',
    scripts: 'dist/scripts/'
}


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

gulp.task('default', ['hbs', 'js_app', 'js_libs']);