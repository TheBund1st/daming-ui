var gulp = require('gulp')
var del = require('del')
var replace = require('gulp-replace')
var ts = require('gulp-typescript')
var gulpif = require('gulp-if')
var postcss = require('gulp-postcss')
var concat = require('gulp-concat')
var postcssConfig = require('../postcss.config')
var exec = require('child_process').exec

var esModuleTypeFile = function(file) {
  return /\.d\.ts/g.test(String(file.path))
}
var esModuleJSFile = function(file) {
  return /\.js/g.test(String(file.path))
}

gulp.task('cleanES', () => del(['../es/*', '../type/*'], { force: true }))

gulp.task('cleanCMD', () => del(['../lib/*'], { force: true }))

gulp.task('buildESCSS', cb => {
  gulp
    .src('../src/**/*.scss')
    .pipe(postcss(postcssConfig.plugins))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('../es'))

  cb()
})

gulp.task('buildCMDCSS', cb => {
  gulp
    .src('../src/**/*.scss')
    .pipe(postcss(postcssConfig.plugins))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('../lib'))

  cb()
})

gulp.task('buildES', cb => {
  var tsProject = ts.createProject('./es.tsconfig.json')
  gulp
    .src(['../src/**/*.tsx', '../src/**/*.ts'])
    .pipe(replace(`import './index.scss'`, ''))
    .pipe(tsProject())
    .pipe(gulpif(esModuleTypeFile, gulp.dest('../type')))
    .pipe(gulpif(esModuleJSFile, gulp.dest('../es')))

  cb()
})

gulp.task('buildCMD', cb => {
  var tsProject = ts.createProject('./cmd.tsconfig.json')
  gulp
    .src(['../src/**/*.tsx', '../src/**/*.ts'])
    .pipe(replace(`import './index.scss'`, ''))
    .pipe(tsProject())
    .pipe(gulp.dest('../lib'))

  cb()
})

gulp.task(
  'build:es',
  gulp.series('cleanES', gulp.parallel('buildES', 'buildESCSS'))
)

gulp.task(
  'build:cmd',
  gulp.series('cleanCMD', gulp.parallel('buildCMD', 'buildCMDCSS'))
)

gulp.task('build', gulp.parallel('build:es', 'build:cmd'))
