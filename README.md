# brainstable.github.io

Личный сайт-портфолио Сергея Мозгового: проекты на C#/.NET, документы Word, карты на Leaflet.

Статический сайт без сборки и зависимостей: HTML, CSS и немного JavaScript. Публикуется через GitHub Pages из ветки `main` (корень репозитория).

## Структура

```
index.html                 страница (русская)
en/index.html              страница (английская)
resume/index.html          резюме (русское)
en/resume/index.html       резюме (английское)
apps/index.html            приложения: карусели скриншотов (ru)
en/apps/index.html         приложения (en)
apps/img/meteo/*.jpg       скриншоты МетеоГСУ, 14 шт.
apps/img/plots/*.jpg       посевные площади, 10 шт.
apps/img/reference/*.jpg   справка по сортоиспытаниям, 12 шт.
apps/img/stats/*.jpg       статобработка, 10 шт.
assets/css/style.css       оформление: темы, стили резюме, карусели, печати
assets/js/main.js          появление блоков, меню, тема, карусели
assets/img/*.svg, *.jpg    иллюстрации и превью проектов (есть светлые версии)
assets/og.png              картинка для соцсетей, ru, 1200×630
assets/og-en.png           картинка для соцсетей, en, 1200×630
assets/resume-ru.pdf       резюме для скачивания (ru, 3 страницы)
assets/resume-en.pdf       резюме для скачивания (en, 3 страницы)
assets/favicon.svg         иконка
maps/geoplots/             живая карта сортоучастков (Leaflet)
maps/geohistory/           живая карта исчезнувших деревень (Leaflet)
.nojekyll                  отключает обработку Jekyll
404.html                   страница для несуществующих адресов
```

## Приложения

- <https://brainstable.github.io/apps/> — МетеоГСУ, посевные площади, справка, статистика
- <https://brainstable.github.io/en/apps/> — английская версия

Карусели на чистом CSS (`scroll-snap`) и ~40 строках JS: стрелки, клавиатура, свайп, счётчик кадров. Скриншоты сжаты до ширины 1400 px (JPEG, q80), грузятся лениво — на страницу приходится около 7 МБ, но первый экран тянет только четыре изображения.

Раньше скриншоты и описания жили в отдельном репозитории `portfolio`; теперь всё на сайте, репозиторий не нужен.

## Резюме

- <https://brainstable.github.io/resume/> — русская версия
- <https://brainstable.github.io/en/resume/> — английская
- Печатная вёрстка в `@media print` (белый лист, без шапки и меню), PDF собраны из неё через Chrome `--print-to-pdf`.

Исходные документы (несколько версий под разные вакансии) лежат в папке `docs/` вне репозитория сайта и в git не попадают.

## Языки

- Русская версия: <https://brainstable.github.io/>
- Английская: <https://brainstable.github.io/en/>
- Переключатель `RU / EN` в шапке, `hreflang` и `og:locale` в мета-тегах, отдельные OG-картинки.

## Темы

По умолчанию — светлая, тёмная включается кнопкой в шапке. Выбор запоминается в `localStorage`; адрес `?theme=dark` или `?theme=light` задаёт тему принудительно (удобно для скриншотов).

Цвета меняются через переменные в `:root` (тёмная) и `[data-theme="light"]` (светлая).

## Живые карты

- <https://brainstable.github.io/maps/geoplots/> — список ГСУ, далее карта участка
- <https://brainstable.github.io/maps/geohistory/> — список районов, далее карта населённого пункта

Это копии репозиториев GeoPlots и GeoHistory. Отличия от исходников:

- подложки Google переведены с `http://` на `https://` — иначе браузер блокирует их на защищённой странице;
- удалены слои и ключи Mapbox, Bing и Yandex (в исходниках они лежали в открытом виде);
- добавлена кнопка «← на сайт» на каждой странице.

## Локальный просмотр

Достаточно открыть `index.html` в браузере. Для проверки по HTTP:

```powershell
python -m http.server 8000
# http://localhost:8000
```

## Публикация

1. Репозиторий `brainstable/brainstable.github.io`, ветка `main`.
2. Settings → Pages → Source: **Deploy from a branch**, ветка `main`, папка `/ (root)`.
3. Сайт: <https://brainstable.github.io>.

## Обновление контента

- Проекты — блоки `<article class="card">` в `index.html`.
- Панель GitHub — секция `#stats`.
- OG-картинка — `assets/og.png` (1200×630), мета-теги в `<head>`.
- Цвета и типографика — переменные в `:root` в начале `style.css`.
