var gulp = require('gulp'), // Подключаем Gulp

  browserSync = require('browser-sync'), // Подключаем Browser Sync
  autoprefixer = require('gulp-autoprefixer'), // Подключаем автопрефиксер

  pug = require('gulp-pug'), // Подключаем Pug
  sass = require('gulp-sass'), // Подключаем Sass
  plumber = require('gulp-plumber'), // Отлавливаем ошибки
  notify = require("gulp-notify"),

  csso = require('gulp-csso'), // Подключаем пакет для минификации CSS
  uglify = require('gulp-uglifyjs'), // Подключаем минификатор для JS

  concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)

  rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов

  combineMq = require('gulp-combine-mq'); // Группируем media запросы


// Настройка Browser-sync (автоперезагрузка)
gulp.task('browser-sync', function () { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
    server: { // Определяем параметры сервера
      baseDir: 'src' // Директория для сервера - src
    },
    notify: false // Отключаем уведомления
  });
});

// Настройка Pug
gulp.task('pug', function () {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .on("error", notify.onError(function (error) {
      return "Message to the notifier: " + error.message;
    }))
    .pipe(gulp.dest('src/'));
});


// Настройка SASS
gulp.task('sass', function () { // Создаем таск SASS
  return gulp.src('src/sass/main.scss') // Берем источник
    .pipe(plumber()) // отлавливаем ошибки при компиляции из SASS в CSS
    .pipe(sass().on('error', sass.logError)) // Преобразуем SASS в CSS
    .pipe(autoprefixer(
      ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
      }
    )) // Создаем префиксы
    .pipe(combineMq({
      beautify: false
    })) // Группируем медиа запросы

    .pipe(gulp.dest('src/css/'))
    .pipe(csso()) // Сжимаем
    .pipe(rename({
      suffix: '.min'
    })) // Добавляем суффикс .min

    .pipe(gulp.dest('src/css/')) // Выгружаем минифицированный css
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Минификация JS
gulp.task('scripts', function () {
  return gulp.src([ // Берем JS файлы для минификации
      'src/js/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify()) // Сжимаем JS файл

    .pipe(gulp.dest('src/js')) // Выгружаем результат
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Наблюдение за файлами
gulp.task('watch', ['browser-sync', 'pug', 'sass', 'scripts'], function () {
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/modules/*.js', ['scripts']);
});


// Перенос файлов в продакшн
gulp.task('build', ['sass', 'scripts'], function () {
  gulp.src(['src/css/*.css'])
    .pipe(gulp.dest('docs/css'));
  gulp.src('src/font/**/*')
    .pipe(gulp.dest('docs/font'));
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('docs/img'));
  gulp.src('src/js/**/*')
    .pipe(gulp.dest('docs/js'));
  gulp.src('src/*.html')
    .pipe(gulp.dest('docs'));
});


gulp.task('default', ['watch']);