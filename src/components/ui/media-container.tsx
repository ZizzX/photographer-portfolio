import * as React from "react"
import { Play, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface MediaContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  type: "image" | "video"
  aspectRatio?: string // Default: 'aspect-video'
}

export function MediaContainer({
  src,
  alt,
  type,
  aspectRatio = "aspect-video",
  className,
  ...props
}: MediaContainerProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md bg-surface cursor-pointer",
        aspectRatio,
        className
      )}
      {...props}
    >
      {type === "image" ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <video
          src={src}
          title={alt}
          muted
          loop
          playsInline
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center">
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-primary">
          {type === "video" ? (
            <Play className="h-12 w-12 fill-primary/20 stroke-[1.5]" />
          ) : (
            <Search className="h-10 w-10" />
          )}
        </div>
      </div>
    </div>
  )
}
