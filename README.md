# brainstable.github.io

Личный сайт-портфолио Сергея Мозгового: проекты на C#/.NET, документы Word, карты на Leaflet.

Статический сайт без сборки и зависимостей: HTML, CSS и немного JavaScript. Публикуется через GitHub Pages из ветки `main` (корень репозитория).

## Структура

```
index.html                 страница
assets/css/style.css       оформление (тёмная тема)
assets/js/main.js          появление блоков, подсветка меню, фолбэк картинок
assets/img/*.svg           иллюстрации и превью проектов
assets/favicon.svg         иконка
.nojekyll                  отключает обработку Jekyll
404.html                   страница для несуществующих адресов
```

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
- Ссылки на GitHub-статистику — секция `#stats`.
- Цвета и типографика — переменные в `:root` в начале `style.css`.
