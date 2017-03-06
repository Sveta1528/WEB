var gulp = require('gulp')
//load plugins
var less = require('gulp-less');
    browserSync = require('browser-sync'); // Подключаем Browser Sync
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
    var imagemin     = require('gulp-imagemin');
    var pngquant     = require('imagemin-pngquant');
    var cache        = require('gulp-cache');
    var htmlmin = require('gulp-htmlmin');
    var cleanCSS = require('gulp-clean-css');
    var spritesmith  = require('gulp.spritesmith')

gulp.task('less-to-css', function(){
    return gulp.src('app/less/**/*.less') // Берем все sass файлы из папки sass и дочерних, если таковые будут
        .pipe(less({
          plugins: [autoprefix,cleancss]
        }))
        .pipe(concat('build.css'))
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

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('icons', function() {
    var spriteData =
        gulp.src('app/img/icons/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'icons.png',
                cssName: 'icons.less',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                  }
            }));

    spriteData.img.pipe(gulp.dest('app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/less/')); // путь, куда сохраняем стили
});

gulp.task('build', ['clean','less-to-css','minify-css','img','html'], function() {

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

});


gulp.task('watch', ['browser-sync', 'index', ], function() {
    gulp.watch('app/less/**/*.less', ['less-to-css']); // Наблюдение за less файлами в папке less
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
    gulp.watch('./index.html', ['index']);
});

gulp.task('default', ['watch']);
