# Cinematic Portfolio: Photographer & Videographer

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Vitest-Testing-729B1B?style=for-the-badge&logo=vitest)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright)

Высокопроизводительный, SEO-оптимизированный production-ready сайт-портфолио, разработанный специально для профессиональных фотографов и видеографов. Проект фокусируется на визуальной эстетике, кинематографичном дизайне и высокой скорости загрузки.

## 🌟 Ключевые особенности

- **Кинематографичный дизайн:** Глубокие черные тона (`Zinc-950`), элегантные шрифты (Playfair Display) и акцентные золотые детали (`#E5B05C`).
- **Кастомный Video Player:** Бесшовно интегрированный фоновый плеер для шоурилов на первом экране. Поддержка автовоспроизведения, скрытия контроллеров и полноэкранного режима.
- **Интерактивное Портфолио:** Адаптивная сетка работ с плавной клиентской фильтрацией по категориям (Свадьбы, Коммерция, Ивенты) и кастомным лайтбоксом для фотографий.
- **Strict Validation:** Форма обратной связи с надежной клиентской валидацией (без использования тяжелых библиотек).
- **SEO & Core Web Vitals:** 
  - Настроена микроразметка Schema.org (JSON-LD) типа `ProfessionalService`.
  - Оптимизированная загрузка изображений через `next/image` (lazy loading, blur placeholders).
  - Score 100/100 в Google Lighthouse.
- **Сквозная аналитика:** Интеграция Google Analytics и Яндекс.Метрики с отслеживанием кастомных целей (Goal: `submit_form`).
- **CI/CD Pipeline:** Настроены GitHub Actions для автоматического линтинга, type-check'а и прогона юнит/E2E тестов при каждом пуше.

## 🛠 Стек технологий

*   **Фреймворк:** [Next.js](https://nextjs.org/) (App Router)
*   **Язык:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
*   **Стилизация:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Компоненты:** Radix UI / Shadcn (Custom) + Lucide Icons
*   **Unit/Компонентные Тесты:** [Vitest](https://vitest.dev/) + React Testing Library
*   **E2E Тесты:** [Playwright](https://playwright.dev/)
*   **Линтинг:** ESLint

## ⚙️ Локальный запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone git@github.com:ZizzX/photographer-portfolio.git
   cd photographer-portfolio
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**
   Создайте файл `.env.local` в корне проекта (можете скопировать из `.env.example`):
   ```env
   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
   NEXT_PUBLIC_YM_ID="XXXXXXXX"
   ```

4. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```
   Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## 🧪 Тестирование

Проект покрыт unit-тестами для UI компонентов (Vitest) и E2E тестами для проверки SEO и рендеринга (Playwright).

*   Запуск Unit тестов: `npm run test:run`
*   Запуск E2E тестов: `npx playwright test`
*   Запуск линтера: `npm run lint`
*   Проверка типов: `npm run typecheck`

## 🚀 Деплой (Vercel)

Проект изначально оптимизирован для деплоя на платформу **Vercel** (присутствует `vercel.json` с заголовками безопасности).

1. Авторизуйтесь на Vercel и нажмите **"Add New Project"**.
2. Выберите этот репозиторий из вашего GitHub.
3. В разделе **Environment Variables** добавьте ваши ключи метрик (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_YM_ID`).
4. Нажмите **Deploy**.

Любые будущие коммиты в ветку `main` будут автоматически проходить тесты через GitHub Actions и разворачиваться на Vercel.

---
*Developed with focus on performance and visual aesthetics.*