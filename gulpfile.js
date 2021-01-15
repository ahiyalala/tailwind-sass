const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browsersync = require('browser-sync').create();
const panini = require('panini');

gulp.task('html', function() {
  return gulp
    .src('src/html/pages/**/*.html')
    .pipe(
      panini({
        root: 'src/html/pages/',
        layouts: 'src/html/layouts/',
        partials: 'src/html/partials/',
        helpers: 'src/html/helpers/',
        data: 'src/html/data/'
      })
    )
    .pipe(gulp.dest('public'));
});

gulp.task('resetPages', done => {
  panini.refresh();
  done();
});

function assets(callback) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')));
      }
      resolve();
    });
  });
}

function serve(callback) {
  browsersync.init(
    {
      server: './public',
      port: 8080,
      host: '0.0.0.0'
    },
    callback
  );
}

function reload(cb) {
  browsersync.reload();
  cb();
}

function watch(cb) {
  return gulp.watch(
    'src/**/*',
    // when something changes, rebuild + reload
    gulp.series(assets, 'resetPages', 'html', reload)
  );
}

exports.build = gulp.series(assets);
exports.dev = gulp.series('html', assets, serve, watch);
