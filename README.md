# Купальские офисные предсказания

Пиксельный статический сайт-рандомайзер для офисной активности ко Дню Ивана Купала.

## Run locally

Откройте `index.html` в браузере. Сборка, сервер и зависимости не нужны.

## Content

Все предсказания лежат в массиве `predictions` в `script.js`.

Редкости:

- `common` — 70%
- `rare` — 25%
- `legendary` — 5%

Сайт не показывает одно и то же предсказание два раза подряд.

## Paper asset

Основные ассеты:

- `assets/kupala-paper.png` — common.
- `assets/kupala-paper-rare.png` — rare.
- `assets/kupala-paper-legendary.png` — legendary.

Рекомендации:

- PNG с прозрачным фоном.
- Пиксельный стиль.
- Текущий размер common/rare: 768 x 960 px.
- Текущий размер legendary: 768 x 1152 px.
- Файл можно заменить без изменений в HTML, CSS или JavaScript.
- Сайт работает и без файла: карточка результата остаётся CSS fallback.

## Publish

Репозиторий рассчитан на GitHub Pages:

1. Создать `LizzBizzLol/kupala-office-fortunes`.
2. Запушить `main`.
3. Включить Pages для `main` / root.
4. Проверить URL: `https://lizzbizzlol.github.io/kupala-office-fortunes/`.
5. После проверки сгенерировать QR-код на этот URL.
