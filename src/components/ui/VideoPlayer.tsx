// Convertit une URL YouTube standard (watch?v=… ou youtu.be/…) en URL embed.
// Renvoie l'URL d'origine si ce n'est pas du YouTube reconnu (laissera le navigateur s'en occuper).
const toEmbedUrl = (url: string): string => {
  const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
};

type Props = {
  url: string;
  title: string;
};

// Lecteur video universel : utilise un iframe pour YouTube, sinon un tag video natif.
const VideoPlayer = ({ url, title }: Props) => {
  const embed = toEmbedUrl(url);
  const isIframe = embed.includes("youtube.com/embed");

  if (isIframe) {
    return (
      <iframe
        src={embed}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: "100%",
          aspectRatio: "16/9",
          border: 0,
          borderRadius: "var(--radius-md)",
        }}
      />
    );
  }

  return (
    <video
      src={url}
      controls
      style={{ width: "100%", borderRadius: "var(--radius-md)" }}
      title={title}
    />
  );
};

export default VideoPlayer;
