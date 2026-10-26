# brainstable.github.io

Личный сайт-портфолио Сергея Мозгового: проекты на C#/.NET, документы Word, карты на Leaflet.

Статический сайт без сборки и зависимостей: HTML, CSS и немного JavaScript. Публикуется через GitHub Pages из ветки `main` (корень репозитория).

## Структура

```
index.html                 страница
assets/css/style.css       оформление: светлая и тёмная темы
assets/js/main.js          появление блоков, подсветка меню, переключатель темы
assets/img/*.svg, *.jpg    иллюстрации и превью проектов (есть светлые версии)
assets/og.png              картинка для соцсетей, 1200×630
assets/favicon.svg         иконка
maps/geoplots/             живая карта сортоучастков (Leaflet)
maps/geohistory/           живая карта исчезнувших деревень (Leaflet)
.nojekyll                  отключает обработку Jekyll
404.html                   страница для несуществующих адресов
```

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
