// Turns a YouTube or Vimeo watch URL into an embed URL and, for YouTube, a thumbnail.
export function parseVideo(url: string) {
  const u = new URL(url);

  if (u.hostname.includes("youtu")) {
    const id = u.hostname === "youtu.be" ? u.pathname.slice(1) : u.searchParams.get("v");
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

  throw new Error(`Only YouTube and Vimeo are supported: ${url}`);
}
