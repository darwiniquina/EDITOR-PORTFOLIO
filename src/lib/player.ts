// Site-styled controls for a self-hosted <video>, drawn over the video inside `host`.
// Replaces the browser's default controls. Used by the home modal and the project page.
const svg = (d: string) => `<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">${d}</svg>`;
const ICON = {
  play: svg('<path d="M8 5v14l11-7z"/>'),
  pause: svg('<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>'),
  sound: svg('<path d="M3 9v6h4l5 4V5L7 9zM16.5 12a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/>'),
  muted: svg('<path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 9l5 6m0-6l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>'),
};
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const btn = "grid h-8 w-8 place-items-center rounded-full text-white/90 transition hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent";

export function addControls(video: HTMLVideoElement, host: HTMLElement) {
  video.controls = false;
  video.dataset.player = ""; // marks a full player, so the reduced-motion rule leaves it visible
  host.classList.add("relative");

  // Centre mark: a spinner while the video loads, the play mark once it is paused, a retry hint if it failed.
  // The whole video is the tap target, so this layer ignores the pointer. No backdrop blur: it is costly on weak GPUs.
  const big = document.createElement("div");
  big.className = "pointer-events-none absolute inset-0 grid place-items-center";
  big.innerHTML = `
    <span data-mark class="hidden h-16 w-16 place-items-center rounded-full bg-black/50 text-white">${ICON.play.replace("h-5 w-5", "h-7 w-7")}</span>
    <span data-spin role="status" aria-label="Loading" class="hidden h-12 w-12 animate-spin rounded-full border-[3px] border-white/25 border-t-white motion-reduce:animate-none"></span>
    <span data-err class="hidden rounded-full bg-black/60 px-4 py-2 text-sm text-white">Couldn't load. Tap to retry</span>`;

  const bar = document.createElement("div");
  bar.className = "absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-12 text-white transition-opacity duration-200 motion-reduce:transition-none";
  bar.innerHTML = `
    <div data-seek role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" class="group/seek relative h-4 cursor-pointer touch-none">
      <div class="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/25 transition-[height] group-hover/seek:h-1.5">
        <div data-buf class="absolute inset-y-0 left-0 w-0 rounded-full bg-white/30"></div>
        <div data-fill class="absolute inset-y-0 left-0 w-0 rounded-full bg-accent"></div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" data-play class="${btn}"></button>
      <span data-time class="font-mono text-xs tabular-nums text-white/80">0:00 / 0:00</span>
      <div class="ml-auto flex items-center gap-1">
        <input type="range" data-vol min="0" max="1" step="0.05" aria-label="Volume" class="h-1 w-16 cursor-pointer accent-accent" />
        <button type="button" data-mute class="${btn}"></button>
      </div>
    </div>`;
  host.append(big, bar);

  const $ = <T extends HTMLElement>(s: string) => bar.querySelector<T>(s)!;
  const seek = $("[data-seek]"), fill = $("[data-fill]"), buf = $("[data-buf]"), time = $("[data-time]"), play = $("[data-play]"), mute = $("[data-mute]"), vol = $<HTMLInputElement>("[data-vol]");
  const mark = big.querySelector<HTMLElement>("[data-mark]")!, spin = big.querySelector<HTMLElement>("[data-spin]")!, err = big.querySelector<HTMLElement>("[data-err]")!;

  // True once playback was stopped by the viewer, the browser or a blocked autoplay: then a paused video shows the play mark, not a spinner.
  let stopped = false;
  video.addEventListener("play", () => (stopped = false));
  video.addEventListener("pause", () => (stopped = true));
  // Autoplay attribute alone can stall at metadata (preload) or be blocked (data saver, low-power mode), so ask for playback explicitly.
  if (video.autoplay && video.paused) video.play().catch(() => ((stopped = true), render()));

  const toggle = () => {
    if (video.error) {
      video.load(); // retry after a failed load
      video.play().catch(() => {});
    } else video.paused ? video.play().catch(() => {}) : video.pause();
  };
  let hide: number;
  // The bar stays up while paused; while playing it fades 2 s after the last movement.
  const show = () => {
    bar.style.opacity = "1";
    clearTimeout(hide);
    if (!video.paused) hide = window.setTimeout(() => (bar.style.opacity = "0"), 2000);
  };
  // Swap an icon only when it changes; timeupdate fires several times a second.
  const swap = (el: HTMLElement, key: string, html: string) => {
    if (el.dataset.k === key) return;
    el.dataset.k = key;
    el.innerHTML = html;
  };
  function render() {
    const d = video.duration || 0, t = video.currentTime;
    fill.style.width = d ? `${(t / d) * 100}%` : "0";
    let end = 0; // end of the buffered range that holds the playhead
    for (let i = 0; i < video.buffered.length; i++) if (video.buffered.start(i) <= t + 0.5) end = Math.max(end, video.buffered.end(i));
    buf.style.width = d ? `${(end / d) * 100}%` : "0";
    time.textContent = `${fmt(t)} / ${fmt(d)}`;
    seek.setAttribute("aria-valuemax", String(Math.round(d)));
    seek.setAttribute("aria-valuenow", String(Math.round(t)));
    swap(play, String(video.paused), video.paused ? ICON.play : ICON.pause);
    play.setAttribute("aria-label", video.paused ? "Play" : "Pause");
    swap(mute, String(video.muted), video.muted ? ICON.muted : ICON.sound);
    mute.setAttribute("aria-label", video.muted ? "Unmute" : "Mute");
    vol.value = String(video.muted ? 0 : video.volume);
    const failed = !!video.error, loading = !failed && !stopped && video.readyState < 3; // 3 = enough data to play on
    spin.classList.toggle("hidden", !loading);
    err.classList.toggle("hidden", !failed);
    mark.classList.toggle("hidden", failed || loading || !video.paused);
    mark.classList.toggle("grid", !failed && !loading && video.paused);
  }

  const scrub = (e: PointerEvent) => {
    const r = seek.getBoundingClientRect();
    if (video.duration) video.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * video.duration;
  };
  seek.addEventListener("pointerdown", (e) => {
    seek.setPointerCapture(e.pointerId);
    scrub(e);
  });
  seek.addEventListener("pointermove", (e) => seek.hasPointerCapture(e.pointerId) && scrub(e));
  seek.addEventListener("keydown", (e) => {
    const step = e.key === "ArrowRight" ? 5 : e.key === "ArrowLeft" ? -5 : 0;
    if (step) video.currentTime += step;
  });

  video.addEventListener("click", toggle);
  play.addEventListener("click", toggle);
  mute.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) video.volume = 0.5; // unmuting at zero would stay silent
  });
  vol.addEventListener("input", () => {
    video.volume = +vol.value;
    video.muted = video.volume === 0;
  });
  host.addEventListener("pointermove", show);
  for (const ev of ["timeupdate", "loadedmetadata", "durationchange", "volumechange", "play", "pause", "waiting", "stalled", "playing", "canplay", "seeked", "progress", "error", "emptied"]) video.addEventListener(ev, render);
  video.addEventListener("play", show);
  video.addEventListener("pause", show);
  // A hidden tab shouldn't keep decoding. The player is removed when the modal closes, so drop the listener then.
  const onVis = () => (video.isConnected ? document.hidden && video.pause() : document.removeEventListener("visibilitychange", onVis));
  document.addEventListener("visibilitychange", onVis);
  render();
  show();
}
