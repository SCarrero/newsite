'use strict';

import plugins       from 'gulp-load-plugins';
import yargs         from 'yargs';
import browser       from 'browser-sync';
import gulp          from 'gulp';
import panini        from 'panini';
import rimraf        from 'rimraf';
import sherpa        from 'style-sherpa';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import uncss         from 'uncss';
import autoprefixer  from 'autoprefixer';

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  const schema = yaml.DEFAULT_SCHEMA.extend(require('js-yaml-js-types').all);
  return yaml.load(ymlFile, { schema });
}

gulp.task('styleGuide',
  gulp.series(styleGuide1, styleGuide2));

// Build the "dist" folder by running all of the below tasks
// to use webpage, add jspack in the gulp.parallel list
gulp.task('build',
 gulp.series(clean, gulp.parallel(pages, copy, images, javascript),  sass, 'styleGuide'));

// Build the site, run the server, and watch for file changes
gulp.task('default',
  gulp.series('build', server, watch));

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets folder
function copy() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist));
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide1(done){
  return sherpa('src/styleguide/index.md', {
    output: PATHS.dist + '/special/styleguide/index.html',
    template: 'src/styleguide/template.html'
  }, done );
}
function styleGuide2(done){
return sherpa('src/styleguide/panini.md', {
  output: PATHS.dist + '/special/styleguide/panini.html',
  template: 'src/styleguide/template.html'
}, done );
}
// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  const postCssPlugins = [
    // Autoprefixer
    autoprefixer(), 
  // UnCSS - Uncomment to remove unused styles in production
  // PRODUCTION && uncss.postcssPlugin(UNCSS_OPTIONS),

  ].filter(Boolean);
  var source = 'src/assets/scss/dev/app.scss';
  if(PRODUCTION) { source = 'src/assets/scss/app.scss'; }
  $.sass.compiler = require('node-sass');
  return gulp.src(source)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.postcss(postCssPlugins))
    .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie10' })))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/ss'))
    .pipe(browser.reload({ stream: true }));
}

let webpackConfig = {
  mode: (PRODUCTION ? 'production' : 'development'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ "@babel/preset-env" ],
            compact: false
          }
        }
      }
    ]
  },
  devtool: !PRODUCTION && 'source-map'
}

function jspack(){
  return gulp.src(PATHS.entries)
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(webpackConfig, webpack2))
    .pipe($.if(PRODUCTION, $.terser()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
}

function javascript(done) {
  gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))    
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
  gulp.src(PATHS.javascriptpack)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app-pack.js'))    
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + '/js'));
  copyjs(done);
}



// Copy images to the "dist" folder
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin([
      $.imagemin.mozjpeg({ progressive: true }),
    ])))
    .pipe(gulp.dest(PATHS.dist + '/images'));
}

// Copy updated js vendor files
function copyjs(done) {
  gulp.src('src/assets/js/vendor/*.*')
    .pipe(gulp.dest(PATHS.dist + '/js/vendor/'));
  gulp.src('src/assets/js/custom/*.*')
    .pipe(gulp.dest(PATHS.dist + '/js/custom/'));
    done();
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  }, done);
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, gulp.series(copy, browser.reload));
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/data/*.{js,json,yml}').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/helpers/**/*.js').on('all', gulp.series(resetPages, pages, browser.reload));
  gulp.watch('src/assets/scss/**/*.scss').on('change', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/js/*.js').on('all', gulp.series(javascript, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, browser.reload));
  gulp.watch('src/styleguide/*').on('all', gulp.series('styleGuide', browser.reload));
}
// end