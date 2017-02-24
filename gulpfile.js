var gulp = require('gulp')
//load plugins
var less = require('gulp-less');
    browserSync = require('browser-sync'); // Подключаем Browser Sync
    minifyCSS = require('gulp-minify-css');
    inlinesource = require('gulp-inline-source');
    var LessPluginCleanCSS = require('less-plugin-clean-css'),
        LessPluginAutoPrefix = require('less-plugin-autoprefix'),
        cleancss = new LessPluginCleanCSS({ advanced: true }),
        autoprefix= new LessPluginAutoPrefix({ browsers: ["last 4 versions"] });

    var htmlclean = require('gulp-htmlclean');
    var concat = require('gulp-concat');

    var uglify = require('gulp-uglify');
    var autoprefixer = require('gulp-autoprefixer');
    var del = require('del'); // Подключаем библиотеку для удаления файлов и папок

gulp.task('less-to-css', function(){
    return gulp.src('app/less/**/*.less') // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(less({
          plugins: [autoprefix,cleancss]
        }))
        .pipe(concat('build.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('./dist/css'))
        includePaths: require('node-normalize-scss').includePaths
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

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('build', ['clean','less-to-css'], function() {

    var buildCss = gulp.src([ // Переносим CSS стили в продакшен
        'app/css/*.css',
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    var buildImgs = gulp.src(['./app/img/*'])
    .pipe(gulp.dest('./dist/img/'));

    var buildImgs2=gulp.src(['./app/img/**/*'])
    .pipe(gulp.dest('./dist/img/'));

});

gulp.task('watch', ['browser-sync', 'index', ], function() {
    gulp.watch('app/less/**/*.less', ['less-to-css']); // Наблюдение за less файлами в папке less
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('./index.html', ['index']);
});

gulp.task('default', ['watch']);
