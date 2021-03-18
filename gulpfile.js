const { src, series, watch, dest } = require("gulp");
const browserSync = require("browser-sync");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const webpack = require("webpack-stream");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var htmlmin = require("gulp-htmlmin");
var compress = require("compression");

function copy() {
  return src("src/**/*").pipe(dest("docs/"));
}

function processJs() {
  return src("src/js/*.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(
      webpack({
        output: {
          filename: "index.min.js"
        }
      })
    )
    .pipe(dest("docs/js"));
}

function processCss() {
  return src("src/css/index.css")
    .pipe(autoprefixer())
    .pipe(concatCss("index.css"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("docs/css"));
}

function serve() {
  return browserSync.init({
    server: "build",
    open: false,
    port: 7000,
    middleware: [compress()],
    watch: true
  });
}

function minifyHtml() {
  return src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("docs"));
}

watch("src/css/*.css", processCss);

watch("src/js/*.js", processJs);

watch("src/*.html", minifyHtml);

exports.build = series(copy, processJs, processCss, serve);
exports.default = series(serve, watch);
