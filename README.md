# aboutFilms

## Краткое описание
About films- сайт для просмотра информации о фильмах/сериалах.Созданный на основе данного [API](https://www.themoviedb.org/documentation/api?language=ru)

[Демо](https://about-films.netlify.app)

# Реализованный функционал

* Возможность посмореть на главной страницы фильмы/сериалы которые, скоро выйдут, показывают на сегодняшний день/неделю в кинотеатрах и по ТВ, также посмотреть  популярные и лучшие фильмы/сериалы.

* Поиск по фильмам,сериалам, актерам.

* Возможность переключать страницы

* Возможность посмотреть более подробную информацию о фильме/сериале <br />
    * С какого возраста фильм/сериал, жанры, дата выхода, краткий сюжет, рейтинг, кол-во голосов, посмотреть трейлер, ссылки на соц.сети
    * Просмотр актеров, а также посмотреть полностью актерский и съемочный состав
    * Просмотр похожих фильмов/сериалов

* Можно посмотреть детальную информацию о актере или человеке из съемочной команды

### Журнал ошибок(известных)

* ~~Некорректное отображение даты у карточки фильма~~ (*Исправлено*)
* ~~На главной страницы слайдер недоработан до конца~~ (*Исправлено*)
* ~~Не отображается время фильма~~ (*Исправлено*)
* ~~Некорректное отображение подробностей фильма/сериала если недостаточно данных о нем~~ (*Исправлено*)
* ~~При переходе на похожий фильм/сериал страничка не ререндариться~~(*Исправлено*)
* ~~При переходе в определенную категорию и скролинге вниз,то после клика по карточке фильма/сериала, скролл остается на месте и получается что вы в начале описания фильма/сериала, а на том месте, где скролили в категории.~~(*Исправлено*)
* ~~Несколько ошибок в логике пагинации~~ (*Исправлено*)
* ~~Приложение растет и из-за этого страдает оптимизация~~(*Исправлено*)
* Если в Съёмочном составе один человек занимает несколько должностей, то он дублируется и за счет этого идет неправильный подсчет полного количества команды.
* Также надо добавить больше разделов на страницу с полным актёрским и съёмочным составом и перевести название профессии

### Что планируется добавить

* Фильтры(по жанрам,датам и т.д)
* Регистрацию/Логин
* Возможность ставить оценки
* Возможность писать комментарии
