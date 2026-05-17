import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { VideoPlayer } from "../VideoPlayer";

describe("VideoPlayer Component", () => {
  beforeEach(() => {
    // Mock HTMLMediaElement methods
    window.HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined);
    window.HTMLMediaElement.prototype.pause = vi.fn();
  });

  it("renders correctly with the given poster", () => {
    render(<VideoPlayer src="test.mp4" poster="poster.jpg" />);

    const videoElement = screen.getByTestId(
      "video-element",
    ) as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();
    expect(videoElement.getAttribute("poster")).toBe("poster.jpg");

    const sourceElement = videoElement.querySelector("source");
    expect(sourceElement).toBeInTheDocument();
    expect(sourceElement?.getAttribute("src")).toBe("test.mp4");
  });

  it("calls play method on custom play button click", () => {
    render(<VideoPlayer src="test.mp4" />);

    const playButton = screen.getByTestId("play-pause-btn");
    fireEvent.click(playButton);

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  });
});
