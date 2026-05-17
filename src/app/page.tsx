import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactForm } from "@/features/contact/ContactForm";
import {
  PortfolioGrid,
  PortfolioItem,
} from "@/features/portfolio/PortfolioGrid";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetrika } from "@/components/shared/YandexMetrika";

export const metadata: Metadata = {
  title: "ISAPOV | Cinematic Photography & Videography",
  description:
    "Профессиональное портфолио фотографа и видеографа. Съемка мероприятий, коммерция, создание шоурилов.",
  openGraph: {
    title: "ISAPOV | Cinematic Photography & Videography",
    description: "Профессиональное портфолио фотографа и видеографа.",
    url: "https://isapov.com",
    siteName: "ISAPOV Portfolio",
    images: [
      {
        url: "https://isapov.com/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
        alt: "ISAPOV Portfolio",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ISAPOV Photography & Videography",
  image: "https://isapov.com/og-image.jpg",
  description:
    "Профессиональное портфолио фотографа и видеографа. Съемка мероприятий, коммерция, создание шоурилов.",
  url: "https://isapov.com",
  telephone: "+79991234567",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Worldwide",
    addressCountry: "RU",
  },
  sameAs: [
    "https://instagram.com/isapov",
    "https://youtube.com/c/isapov",
    "https://t.me/isapov",
  ],
};

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Wedding Day in Italy",
    type: "photo",
    category: "weddings",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Product Showcase",
    type: "video",
    category: "commercial",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "3",
    title: "Corporate Event 2025",
    type: "photo",
    category: "events",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Summer Wedding",
    type: "photo",
    category: "weddings",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Cinematic Backstage",
    type: "video",
    category: "backstage",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "6",
    title: "Tech Conference",
    type: "photo",
    category: "events",
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Fashion Campaign",
    type: "photo",
    category: "commercial",
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
  },
];

const services = [
  {
    title: "Съемка мероприятий",
    description:
      "Репортажная фото- и видеосъемка корпоративов, конференций, закрытых вечеринок.",
    price: "от $500 / день",
  },
  {
    title: "Монтаж шоурилов",
    description:
      "Динамичный кинематографичный монтаж, цветокоррекция, саунд-дизайн.",
    price: "от $300 / проект",
  },
  {
    title: "Индивидуальные фотосессии",
    description:
      "Студийная и уличная съемка с подбором локаций и проработкой образа.",
    price: "от $200 / час",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      {process.env.NEXT_PUBLIC_YM_ID && (
        <YandexMetrika ymId={process.env.NEXT_PUBLIC_YM_ID} />
      )}

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            {/* Используем div поверх видео, чтобы блокировать клики и скрывать контроллы плеера (хотя они и так скрыты, но для гарантии фона) */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <VideoPlayer
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              autoplay
              loop
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white tracking-tight">
              Запечатлеть <span className="text-[#E5B05C] italic">Эмоции</span>.{" "}
              <br /> Создать{" "}
              <span className="text-[#E5B05C] italic">Историю</span>.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-zinc-300 font-light">
              Профессиональная фотография и кинематографичная видеография для
              тех, кто ценит качество в каждой детали.
            </p>
            <div className="pt-4">
              <Link href="#contact" passHref>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full font-medium tracking-wide"
                >
                  Обсудить проект
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white">
                Избранные Работы
              </h2>
              <div className="w-24 h-1 bg-[#E5B05C] mx-auto rounded-full"></div>
            </div>
            <PortfolioGrid items={portfolioItems} initialLimit={6} />
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-24 bg-zinc-950 border-y border-zinc-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white">
                Услуги & Цены
              </h2>
              <div className="w-24 h-1 bg-[#E5B05C] mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-black p-8 border border-zinc-800 rounded-lg hover:border-[#E5B05C]/50 transition-colors duration-300 group"
                >
                  <h3 className="text-2xl font-playfair text-white mb-4 group-hover:text-[#E5B05C] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 mb-6 min-h-[80px]">
                    {service.description}
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white">
                Связаться со Мной
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Оставьте заявку, и я свяжусь с вами для обсуждения деталей
                вашего проекта и расчета стоимости.
              </p>
              <div className="w-24 h-1 bg-[#E5B05C] mx-auto rounded-full mt-4"></div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
