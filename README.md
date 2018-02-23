# Стартовый шаблон для HTML / CSS / JS Розработка
[Elmsoft] (http://new.elmsoft.ru/) стартовый шаблон.
***

## Структура
`/ Src /` - папка для source кода

'/ Build / `- здесь будет конца собранный проект

`/ Gulp /` - папка с задачами для [gulp] (http://gulpjs.com/)
***

## Структура src
`/ Fonts /` - шрифты -> копируются в `build / css / fonts`

'/ Img / `- картинки -> копируются в` build / img`

'/ Img / icons / `- генерируется спрайт из всех картнок содержащиеся в папке -> спрайт сохраняется` build / img`, стиле и Миксины для спрайтов хранятся в `/ scss / lib / _sprite.sass`

'/ Img / svg / `- генерируется svg шрифт из всех картнок содержащиеся в папке -> шрифт хранится в` build / css / fonts`

`/ Js /` - js код

`/ Lib /` - сохраняются все bower зависимости

`/ Partials /` - html шаблоны, можно инклудиты с помощью комментариев, [подробно здесь] (https://www.npmjs.com/package/gulp-include)

`/ Scss /` - scss [scss документация] (http://sass-lang.com/)
***

## Установка

+ Установить [node.js] (https://github.com/creationix/nvm)
+ Установить глобально bower, gulp
+ Скачать репозиторий и установить npm i bower зависимости, выполнив в папке проекта команды

$ Bower install
$ Npm install

+ Собрать проект и запустить gulp

$ Gulp build
$ gulp

***

## Gulp задачи

задачи gulp-cli описаны здесь [gulp cli doc] (https://github.com/gulpjs/gulp/blob/master/docs/CLI.md)

Название задачи | Команда для запуска | описание
------------- | -------------------- | -----
** copy ** | `Gulp copy` | Копирование фалов `src -> build`
** html ** | `Gulp html` | Сбор `html` файлов
** font ** | `Gulp font` | Генерирование иконочного шрифта с svg картинок
** js ** | `Gulp js` | Сборе компиляции и минимизация `js` файлов
** jslint ** | `Gulp jslint` | Линтинг `js` кода
** sass ** | `Gulp sass` | Компиляции и минимизация `scss` и` sass`
** server ** | `Gulp server` | запуск сервера
** sprite ** | `Gulp sprite` | Генерирование спрайтов из папки `src / icons`, и генерирования стилей и Миксины для них '/ scss / lib / _sprite.sass`
** delete ** | `Gulp delete` | Очистка папки `build`
** default ** | `Gulp` | Запуск наблюдателей по всем файлами и перекомпиляция в случае изменения
** build ** | `Gulp build` | Запуск всех задач для полной сборки проекта