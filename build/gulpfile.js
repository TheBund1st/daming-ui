var gulp = require('gulp')
var del = require('del')
var replace = require('gulp-replace')
var ts = require('gulp-typescript')
var gulpif = require('gulp-if')
var postcss = require('gulp-postcss')
var concat = require('gulp-concat')
var header = require('gulp-header')
var postcssConfig = require('../postcss.config')
var exec = require('child_process').exec

var esModuleTypeFile = function(file) {
  return /\.d\.ts/g.test(String(file.path))
}
var esModuleJSFile = function(file) {
  return /\.js/g.test(String(file.path))
}

var cleanES = () => del(['../es/*', '../type/*'], { force: true })

var cleanCMD = () => del(['../lib/*'], { force: true })

var buildCSS = destFolder => {
  return function buildCSS(cb) {
    return gulp
      .src('../src/**/*.scss')
      .pipe(postcss(postcssConfig.plugins))
      .pipe(concat('index.css'))
      .pipe(gulp.dest(destFolder))
  }
}

var importESCSS = cb => {
  return gulp
    .src('../es/index.js')
    .pipe(header(`import './index.css';\n`))
    .pipe(gulp.dest('../es'))
}

var importCMDCSS = cb => {
  return gulp
    .src('../lib/index.js')
    .pipe(header(`require('./index.css');\n`))
    .pipe(gulp.dest('../lib'))
}

var buildES = cb => {
  var tsProject = ts.createProject('./es.tsconfig.json')
  return gulp
    .src(['../src/**/*.tsx', '../src/**/*.ts'])
    .pipe(replace(`import './index.scss'`, ''))
    .pipe(tsProject())
    .pipe(gulpif(esModuleTypeFile, gulp.dest('../type')))
    .pipe(gulpif(esModuleJSFile, gulp.dest('../es')))
}

var buildCMD = cb => {
  var tsProject = ts.createProject('./cmd.tsconfig.json')
  return gulp
    .src(['../src/**/*.tsx', '../src/**/*.ts'])
    .pipe(replace(`import './index.scss'`, ''))
    .pipe(tsProject())
    .pipe(gulp.dest('../lib'))
}

gulp.task(
  'build:es',
  gulp.series(cleanES, gulp.parallel(buildES, buildCSS('../es')), importESCSS)
)

gulp.task(
  'build:cmd',
  gulp.series(
    cleanCMD,
    gulp.parallel(buildCMD, buildCSS('../lib')),
    importCMDCSS
  )
)

gulp.task('build', gulp.parallel('build:es', 'build:cmd'))
