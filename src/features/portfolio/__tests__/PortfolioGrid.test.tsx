import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PortfolioGrid, PortfolioItem } from "../PortfolioGrid";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt || ""} {...props} />;
  },
}));

// Mock ResizeObserver for React
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const mockItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Wedding 1",
    type: "photo",
    category: "weddings",
    src: "/img1.jpg",
  },
  {
    id: "2",
    title: "Commercial 1",
    type: "video",
    category: "commercial",
    src: "/vid1.mp4",
  },
  {
    id: "3",
    title: "Event 1",
    type: "photo",
    category: "events",
    src: "/img2.jpg",
  },
  {
    id: "4",
    title: "Wedding 2",
    type: "photo",
    category: "weddings",
    src: "/img3.jpg",
  },
  {
    id: "5",
    title: "Backstage 1",
    type: "video",
    category: "backstage",
    src: "/vid2.mp4",
  },
  {
    id: "6",
    title: "Event 2",
    type: "photo",
    category: "events",
    src: "/img4.jpg",
  },
  {
    id: "7",
    title: "Commercial 2",
    type: "photo",
    category: "commercial",
    src: "/img5.jpg",
  },
];

describe("PortfolioGrid", () => {
  it("renders all items initially according to limit", () => {
    render(<PortfolioGrid items={mockItems} initialLimit={4} />);

    const photos = screen.queryAllByTestId("portfolio-item-photo");
    const videos = screen.queryAllByTestId("portfolio-item-video");

    expect(photos.length + videos.length).toBe(4);
    expect(screen.getByTestId("load-more-btn")).toBeInTheDocument();
  });

  it("filters items correctly when a category is selected", () => {
    render(<PortfolioGrid items={mockItems} initialLimit={6} />);

    // Click on "Weddings" filter
    const weddingFilterBtn = screen.getByTestId("filter-weddings");
    fireEvent.click(weddingFilterBtn);

    const photos = screen.queryAllByTestId("portfolio-item-photo");
    const videos = screen.queryAllByTestId("portfolio-item-video");

    // In mockItems, there are 2 weddings, both are photos
    expect(photos.length).toBe(2);
    expect(videos.length).toBe(0);

    // Load more should not be present since 2 < 6
    expect(screen.queryByTestId("load-more-btn")).not.toBeInTheDocument();
  });

  it("load more button works correctly", () => {
    render(<PortfolioGrid items={mockItems} initialLimit={4} />);

    const loadMoreBtn = screen.getByTestId("load-more-btn");
    fireEvent.click(loadMoreBtn);

    const photos = screen.queryAllByTestId("portfolio-item-photo");
    const videos = screen.queryAllByTestId("portfolio-item-video");

    // After clicking load more, limit is 8. Total items = 7.
    expect(photos.length + videos.length).toBe(7);

    // Load more should disappear
    expect(screen.queryByTestId("load-more-btn")).not.toBeInTheDocument();
  });

  it("opens and closes lightbox on photo click", () => {
    render(<PortfolioGrid items={mockItems} initialLimit={6} />);

    // First wedding photo
    const photos = screen.getAllByTestId("portfolio-item-photo");
    fireEvent.click(photos[0]);

    // Lightbox should be present
    const lightbox = screen.getByTestId("lightbox");
    expect(lightbox).toBeInTheDocument();

    // Close lightbox
    const closeBtn = screen.getByTestId("lightbox-close");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });
});
