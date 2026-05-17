# База знаний проекта (Project Memory)

## Суть проекта
Высокопроизводительный, SEO-оптимизированный production-ready сайт-портфолио для профессионального фотографа и видеографа (услуги: съемка мероприятий, монтаж, фотосессии).

## Утвержденный стек технологий
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS (v4)
- **UI Components:** Shadcn UI (Custom)
- **Testing (Unit/Integration):** Vitest + React Testing Library
- **Testing (E2E):** Playwright
- **SEO:** Schema.org (JSON-LD) для микроразметки, семантический HTML

## Дизайн-решения (Брендбук)
- **Tone of Voice:** Профессиональный, кинематографичный, минималистичный. Фокус на визуальных образах, эмоциях и высоком качестве. Меньше слов, больше фокуса на портфолио.
- **Цветовая палитра (Dark Cinematic):**
  - Background (Фон): `#09090B` (Deep Black / Zinc-950)
  - Surface/Cards (Карточки): `#18181B` (Zinc-900)
  - Primary Accent (Акцент): `#E5B05C` (Cinematic Gold)
  - Secondary Accent (Доп. акцент): `#27272A` (Zinc-800 - бордеры)
  - Text Primary (Текст осн.): `#FAFAFA` (Zinc-50)
  - Text Secondary (Текст доп.): `#A1A1AA` (Zinc-400)
- **Типографика:**
  - Заголовки (Headings): `Playfair Display` (Элегантность, классика, кинематограф)
  - Интерфейс и текст (Body): `Inter` или `Geist` (Чистота, читаемость)
- **Правила отображения медиа:**
  - Изображения без лишних рамок (edge-to-edge), использование masonry-сеток для галерей.
  - Обязательный blur-up placeholder во время загрузки (Next/Image).
  - Hover-эффекты: плавное затемнение (dimming) с легким увеличением (scale 1.05) и появлением золотого акцента.
  - Видео: автовоспроизведение (muted) для шоурилов на первом экране.

## Архитектура и Структура папок
Все основные файлы хранятся в директории `src/`:
- `src/app/` — роутинг и страницы (App Router).
- `src/components/ui/` — атомарные базовые элементы (UI-kit).
- `src/components/shared/` — переиспользуемые составные компоненты (шапка, футер, плеер).
- `src/features/` — интерактивные бизнес-фичи.
- `src/widgets/` — крупные контентные блоки страниц.
- `src/lib/` — утилиты, хелперы, конфигурации.
- `__tests__/` и `e2e/` — конфигурация и файлы тестов.

## Разработанные компоненты (UI-kit)
- `Button`: Варианты (`primary`, `secondary`, `outline`, `ghost`), поддержка состояний (`isLoading`, `disabled`).
- `Input` / `Textarea`: Поля ввода, поддержка состояния `error` (красная рамка + текст ошибки), focus-эффекты.
- `MediaContainer`: Обёртка для изображений и видео, hover-эффекты, строгие пропорции (по умолчанию `aspect-video`).
- `Badge`: Компактные плашки-теги (варианты `default`, `outline`).
- `VideoPlayer`: Кастомный видеоплеер (`src/components/shared/VideoPlayer.tsx`), скрывающий стандартные контроллеры браузера. Оснащен автоскрытием интерфейса, кастомным прогресс-баром, полноэкранным режимом и принудительным `muted` для автовоспроизведения. Для оптимизации используется `useRef` для прямого доступа к API `<video>`.
- `PortfolioGrid`: Модуль сетки портфолио (`src/features/portfolio/PortfolioGrid.tsx`). Включает фильтрацию по категориям, пагинацию ("Показать еще") и кастомный полноэкранный лайтбокс для фотографий (с предотвращением закрытия при клике на изображение и кнопкой X). 
  - Структура данных `PortfolioItem`: `{ id: string, title: string, type: 'photo' | 'video', category: 'weddings' | 'commercial' | 'events' | 'backstage', src: string, poster?: string }`.
- `ContactForm`: Форма обратной связи (`src/features/contact/ContactForm.tsx`). Включает строгую клиентскую валидацию: Имя (минимум 2 символа), Email (регулярное выражение), Сообщение (минимум 10 символов). Реализует состояния отправки и успешного завершения.

## Структура Главной страницы
`src/app/page.tsx` включает:
1. **Header**: Фиксированная шапка с плавным скроллом к якорным ссылкам.
2. **Hero Section**: Фоновое автовоспроизводящееся видео без звука (`VideoPlayer`), кинематографичный заголовок и CTA-кнопка.
3. **Portfolio Section**: Использование компонента `PortfolioGrid`.
4. **Services Section**: Сетка с описанием услуг и цен (Съемка, Монтаж, Фотосессии).
5. **Contact Section**: Интеграция `ContactForm`.
6. **Footer**: Копирайт, ссылки на соцсети (Instagram, YouTube, Telegram) и юридическая информация (inline SVGs вместо сторонних иконок).
7. **SEO Metadata**: Экспортируется объект `metadata` с `title`, `description` и тегами `openGraph`.
8. **JSON-LD**: Внедрен структурированный скрипт `ProfessionalService` для улучшенной видимости в поисковиках.

## CI/CD и Инструкции по Деплою
- **Целевой репозиторий**: `https://github.com/ZizzX`
- **Финальный статус проекта**: Production Ready / Handover. Все требования закрыты, тесты пройдены.
- **CI/CD пайплайн (GitHub Actions)**: Настроен файл `.github/workflows/ci.yml`. Он автоматически запускается при пуше или Pull Request'е в ветку `main`. Включает установку зависимостей, проверку линтера, проверку типов (`tsc --noEmit`), юнит-тесты (`vitest`) и E2E тесты (`playwright`).
- **Инструкция по настройке на Vercel**:
  1. Импортируйте репозиторий в панель управления Vercel.
  2. Перейдите в Settings -> Environment Variables.
  3. Добавьте переменные окружения, взяв их названия из `.env.example`:
     - `NEXT_PUBLIC_GA_ID` (ID счетчика Google Analytics)
     - `NEXT_PUBLIC_YM_ID` (ID счетчика Яндекс Метрики)
  4. Нажмите Deploy. Кастомные заголовки безопасности автоматически подхватятся из `vercel.json`.