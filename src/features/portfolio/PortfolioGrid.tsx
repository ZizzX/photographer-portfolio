"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { MediaContainer } from "@/components/ui/media-container";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface PortfolioItem {
  id: string;
  title: string;
  type: "photo" | "video";
  category: "weddings" | "commercial" | "events" | "backstage";
  src: string;
  poster?: string;
}

interface PortfolioGridProps {
  items: PortfolioItem[];
  initialLimit?: number;
}

const CATEGORIES = [
  { value: "all", label: "Все" },
  { value: "weddings", label: "Свадьбы" },
  { value: "commercial", label: "Коммерция" },
  { value: "events", label: "Ивенты" },
  { value: "backstage", label: "Бэкстейдж" },
] as const;

type FilterCategory = (typeof CATEGORIES)[number]["value"];

export function PortfolioGrid({ items, initialLimit = 6 }: PortfolioGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [limit, setLimit] = useState(initialLimit);
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(
    null,
  );

  const filteredItems = items.filter(
    (item) => activeFilter === "all" || item.category === activeFilter,
  );

  const visibleItems = filteredItems.slice(0, limit);
  const hasMore = visibleItems.length < filteredItems.length;

  const handleFilterChange = (category: FilterCategory) => {
    setActiveFilter(category);
    setLimit(initialLimit); // Сбрасываем лимит при смене фильтра
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + initialLimit);
  };

  const handleItemClick = (item: PortfolioItem) => {
    if (item.type === "photo") {
      setSelectedPhoto(item);
    }
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="w-full">
      {/* Панель фильтров */}
      <div
        className="flex flex-wrap items-center justify-center gap-2 mb-8"
        data-testid="portfolio-filters"
      >
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={activeFilter === cat.value ? "primary" : "outline"}
            onClick={() => handleFilterChange(cat.value)}
            className={cn(
              "transition-colors",
              activeFilter === cat.value &&
                "bg-[#E5B05C] text-black hover:bg-[#E5B05C]/90 border-[#E5B05C]",
            )}
            data-testid={`filter-${cat.value}`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Сетка элементов */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500"
        data-testid="portfolio-grid"
      >
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            data-testid={`portfolio-item-${item.type}`}
            className="animate-in fade-in zoom-in duration-500"
          >
            {item.type === "photo" ? (
              <MediaContainer
                type="image"
                src={item.src}
                alt={item.title}
                className="w-full h-full"
              />
            ) : (
              <VideoPlayer
                src={item.src}
                poster={item.poster}
                className="w-full h-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Кнопка Показать еще */}
      {hasMore && (
        <div className="mt-10 flex justify-center animate-in fade-in duration-500">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            data-testid="load-more-btn"
            className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/50"
          >
            Показать еще
          </Button>
        </div>
      )}

      {/* Лайтбокс */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
          data-testid="lightbox"
        >
          <button
            className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors focus:outline-none z-50"
            onClick={closeLightbox}
            data-testid="lightbox-close"
          >
            <X size={32} />
          </button>
          {/* Предотвращаем закрытие при клике на саму картинку */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
