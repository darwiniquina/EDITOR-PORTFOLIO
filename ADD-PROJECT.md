# Add a new video project

Use this every time a new edited video goes into the portfolio. Run commands from the repo root. `<slug>` is the lowercase-hyphenated title (for example `quality-over-quantity-wins-every-time`) and must be identical in all files below.

## 1. Pick the source

Take the latest final render (not a draft or `contact.jpg`) from the video project's `renders/` folder. Never commit the original.

## 2. Full video: `public/videos/<slug>-v1.mp4`

```powershell
ffmpeg -i "<render>.mp4" -vf "scale=720:1280:force_original_aspect_ratio=decrease" -c:v libx264 -crf 28 -preset slow -maxrate 2M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart "public\videos\<slug>-v1.mp4"
```

About 10 MB per minute. Over about 12 MB, raise `-crf`. Never overwrite an existing file: see `VIDEOS.md` to change one.

## 3. Hover preview and thumbnail (450x800)

Moving clip, 2.5 s, no audio, from 1 s in (about 80 KB):

```powershell
ffmpeg -ss 1 -t 2.5 -i "<render>.mp4" -an -vf "fps=24,crop='min(iw,ih*9/16)':ih,scale=450:800" -c:v libx264 -crf 30 -preset slow -movflags +faststart "public\previews\<slug>.mp4"
```

Thumbnail (`.webp`, about 15 KB). Open it and check the frame is a good one; change `-ss` if not:

```powershell
ffmpeg -ss 1 -i "<render>.mp4" -frames:v 1 -vf "scale=450:800" -quality 75 "public\previews\<slug>.webp"
```

## 4. Project file: `src/content/work/<slug>.md`

```md
---
title: "Sentence-case title taken from the video"
order: 0
category: talking-heads
description: "2-3 sentences on what the video says, written from its transcript."
videoFile: "<slug>-v1.mp4"
---
```

- `order` sets the home grid position (lowest first). **New projects always go first**: set `order` to one less than the lowest `order` in `src/content/work/` (negative numbers are fine), so the newest video leads both All and its category. Find it with `grep -h "^order:" src/content/work/*.md | sort -t: -k2 -n | head -1`.
- `category` is one of `ugc`, `talking-heads`, `real-estate`.
- Write the description from the real transcript (for example `assets/final-asr.json` in the video project). Crawlers cannot read video.
- Add `client`, `year`, `role` only when confirmed. Label personal and spec work clearly.

## 5. Check

1. `npm run build` passes (runs `astro check`, then `astro build`).
2. All four files exist with the same slug: video, preview `.mp4`, preview `.webp`, project `.md`.
3. Look at the card in the grid (thumbnail, hover motion) and play the video.
4. Do not commit or push unless Darwin asks.
