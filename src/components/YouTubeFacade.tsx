import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  className?: string;
}

const YouTubeFacade = ({ videoId, title, className = "" }: YouTubeFacadeProps) => {
  const [activated, setActivated] = useState(false);

  if (activated) {
    return (
      <div className={`aspect-video overflow-hidden bg-graphite ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Assistir vídeo: ${title}`}
      className={`group relative block aspect-video w-full overflow-hidden bg-graphite text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/25" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
        </span>
      </span>
      <span className="sr-only">Reproduzir vídeo {title}</span>
    </button>
  );
};

export default YouTubeFacade;
