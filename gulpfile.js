var gulp = require('gulp')
//load plugins
var less = require('gulp-less');
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    minifyCSS = require('gulp-minify-css');
    inlinesource = require('gulp-inline-source');
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

    var htmlclean = require('gulp-htmlclean');
    var concat = require('gulp-concat');

    var uglify = require('gulp-uglify');

gulp.task('less-to-css', function(){
    return gulp.src('app/less/**/*.less') // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(less({
          plugins: [autoprefix, cleancss]
        }))
        .pipe(concat('build.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

//minify fonts
gulp.src('./app/fonts/*.css')
  .pipe(minifyCSS())
  .pipe(gulp.dest('./public/fonts/'));


//move images to public
gulp.src(['./app/img/*']).pipe(gulp.dest('./public/img/'));
gulp.src(['./app/img/**/*']).pipe(gulp.dest('./public/img/'));

//inline link, script and img in index.html . Clean html.
gulp.task('index', function () {
    var options = {
        compress: true
    };
    return gulp.src('./index.html')
        .pipe(htmlclean())
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', ['browser-sync', 'index', ], function() {
    gulp.watch('app/less/**/*.less', ['less-to-css']); // Наблюдение за less файлами в папке less
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('./index.html', ['index']);
});

gulp.task('default', ['watch']);
