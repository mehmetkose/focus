const gulp = require('gulp');
const clean = require('gulp-clean');
const livereload = require('gulp-server-livereload');
const watchify = require('watchify');
const errorify = require('errorify');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const browserify = require('browserify');

const checkdir = require('checkdir');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;

var settings = require('./package.json');

const instanceBrowserify = browserify({
                              entries: ['./src/app.jsx', './src/components/clickable.jsx'],
                              extensions: ['.js', '.jsx'],
                              cache: {},
                              packageCache: {},
                              plugin: 'errorify'
                           })
                           .transform("babelify",{ presets: ['react', 'es2015', 'stage-0'] })
                           //.transform({ global: true },"uglifyify")
                           .on('error', function(err) { console.error(err); this.emit('end'); });

const filesWatch = [
    'src/*.*',
    '!src/*.jsx',
    'src/libs/**/*'
];

bundler = () =>
    instanceBrowserify
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'))


watcher = () => {
    instanceBrowserify
        .plugin('watchify')
        .on('update', bundler)
        .on('log', gutil.log.bind(this, 'Watchify update...'))
    bundler()
    gulp.watch(filesWatch, move)
}

cleaner = () =>
    gulp.src('dist', { read: false })
        .pipe(clean())

server = () =>
    gulp.src(['dist'])
        .pipe(livereload({
            livereload: true,
            defaultFile: 'index.html',
            fallback: 'index.html',
            log: 'debug'
        }))

move = (event) =>
    gulp.src(event.path, { base: 'src' })
        .pipe(gulp.dest('dist'))

moveAll = () =>
    gulp.src(filesWatch, { base: 'src'} )
        .pipe(gulp.dest('dist'))

// Scaffold Mobile & Desktop
scaffold = () => {
    let appSlug = settings.app.appSlug || "hello";
    let appName = settings.app.appName || "HelloWorld";
    let companySlug = settings.app.companySlug || "focus";

    checkdir('tmp/', { ignoreDotFiles: true }).then(info => {
      if (info.empty) {
        mkdirp('tmp/', function (err) {
            if (err) console.error(err)
            else console.log('>>> tmp folder created')
        });
      }
    })

    let commands = [
      `cd tmp`,
      `cordova create cordova com.${companySlug}.${appName} ${appName}`,
    ]

    exec(commands.join(' && '), (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      console.log(err);
    });

  }

gulp
    .task('bundle', bundler)
    .task('move-static', moveAll)
    .task('watch', watcher)
    .task('clean', cleaner)
    .task('server', server)
    .task('scaffold', scaffold)
    .task('build', ['bundle', 'move-static'])
    .task('default', ['watch', 'server']);
