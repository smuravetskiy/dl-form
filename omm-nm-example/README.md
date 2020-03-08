## Домашнее задание:

нужно проверить входящие данные с помощью уже подключенной библиотеки `validate`

Формат вызова методов для проверки следующий:

в переменную присваиваем вызов валидатора и передаем в него
данные которые хотим проверить

Что такое класс и почему он тут используется на данный момент не важно
Но если хотите изучить эту тему то прилагаю ссылки на документацию
https://learn.javascript.ru/es-class

Обязательно перед вызовом поставить ключевое слово new
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new

Это нужно для того чтобы класс корректно отработал
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/class

`const validator = new Validate(input)`

после того как инциализирован класс для проверки можно вызывать его методы:

`validator.isString().isNotEmpty().isValid`

методы можно соединять в цепочки чтобы проверить несколько сразу
после чего нужно получить результат в последнем элементе цепочки

`isValid`

он вернет булево значение после всех проверок


### Запуск контейнера для работы

Убедиться что репозиторий находится в актульном состоянии
`git pull`

Установить Docker на компьютер на нужную систему
https://www.docker.com/products/docker-desktop

После чего зайти в папку проекта
`cd ./omm-nm-example` так как в этой директории лежит файл для работы докера
В любой другой директории докер не запустится так как зависит от этих файлов

После чего проект можно запустить с помощью команды
`docker-compose up --build`

для перезапуска нужно остановить текущий процесс в терминале и запустить команду снова