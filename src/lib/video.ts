// Turns a YouTube or Vimeo watch URL into an embed URL and, for YouTube, a thumbnail.
export function parseVideo(url: string) {
  const u = new URL(url);

  if (u.hostname.includes("youtu")) {
    const id = u.hostname === "youtu.be" ? u.pathname.slice(1) : u.pathname.startsWith("/shorts/") ? u.pathname.split("/")[2] : u.searchParams.get("v");
    if (!id) throw new Error(`Unrecognised YouTube URL: ${url}`);
    return {
      embed: `https://www.youtube-nocookie.com/embed/${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (u.hostname.includes("vimeo.com")) {
    const id = u.pathname.split("/").filter(Boolean).pop();
    // shortcut: Vimeo has no static thumbnail URL, so use a local `thumbnail` instead.
    return { embed: `https://player.vimeo.com/video/${id}`, thumbnail: undefined };
  }

  if (u.hostname === "drive.google.com") {
    const id = u.pathname.split("/")[3]; // /file/d/<id>/preview
    if (!id) throw new Error(`Unrecognised Google Drive URL: ${url}`);
    // shortcut: Drive has no thumbnail URL or autoplay, and throttles busy files. Trial only.
    return { embed: `https://drive.google.com/file/d/${id}/preview`, thumbnail: undefined };
  }

  throw new Error(`Only YouTube, Vimeo and Google Drive are supported: ${url}`);
}
