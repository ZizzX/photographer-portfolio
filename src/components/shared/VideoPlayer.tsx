"use client";

import React, { useRef, useState, useEffect, MouseEvent } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(autoplay ? true : muted);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 2500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => setShowControls(false));
    }

    return () => {
      clearTimeout(timeout);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", () =>
          setShowControls(false),
        );
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && isPlaying && video.paused) {
      video.play().catch((err) => {
        // Игнорируем специфические ошибки, которые не критичны для пользователя или ожидаемы в некоторых средах
        const ignoredErrors = ["AbortError", "NotSupportedError"];
        if (!ignoredErrors.includes(err.name)) {
          console.warn("Playback failed:", err.name, err.message);
        }
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowControls(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group overflow-hidden bg-black flex items-center justify-center aspect-video",
        className,
      )}
    >
      <video
        ref={videoRef}
        data-testid="video-element"
        poster={poster}
        loop={loop}
        muted={muted || autoplay}
        autoPlay={autoplay}
        playsInline
        controls={false}
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300 flex flex-col gap-2",
          showControls || !isPlaying ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className="h-1.5 bg-zinc-800 cursor-pointer rounded-full overflow-hidden"
          onClick={handleProgressClick}
          data-testid="progress-bar-container"
        >
          <div
            className="h-full bg-[#E5B05C] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-zinc-50 pt-1">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="hover:text-[#E5B05C] transition-colors focus:outline-none"
              data-testid="play-pause-btn"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="hover:text-[#E5B05C] transition-colors focus:outline-none"
                data-testid="mute-btn"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <span className="text-sm font-medium tabular-nums text-zinc-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <button
            onClick={toggleFullscreen}
            className="hover:text-[#E5B05C] transition-colors focus:outline-none"
            data-testid="fullscreen-btn"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
