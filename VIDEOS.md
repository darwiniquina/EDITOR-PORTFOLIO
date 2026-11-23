# Self-hosted videos

Full reels live in `public/videos/` and are named in each project file with `videoFile`. They win over `videoUrl` (Drive, YouTube, Vimeo). Projects with neither show the short preview clip.

Vercel serves `/videos/*` with a one-year `immutable` cache (see `vercel.json`), and Cloudflare caches the same files. **A file with a given name must never change.** To fix a video, give the new file a new name (below).

## Add a video

1. Compress it (vertical 720x1280, about 10 MB per minute):

   ```powershell
   ffmpeg -i "C:\path\to\original.mp4" -vf "scale=720:1280:force_original_aspect_ratio=decrease" -c:v libx264 -crf 28 -preset slow -maxrate 2M -bufsize 4M -c:a aac -b:a 96k -movflags +faststart "public\videos\<slug>-v1.mp4"
   ```

   `+faststart` lets the video start playing before it has fully downloaded. Do not skip it.

2. Check the size. Over about 12 MB, raise `-crf` (30 or 32) and run it again.
3. In `src/content/work/<slug>.md` add `videoFile: "<slug>-v1.mp4"`.
4. The project also needs `public/previews/<slug>.webp`. It is the poster shown while the video loads.
5. Run `npm run build`.

## Change (fix) a video

Never overwrite an existing file. Browsers and Cloudflare keep it for up to a year.

1. Export the fixed video and compress it as above, but to the next version name: `<slug>-v2.mp4`.
2. Change `videoFile` in the project file to `"<slug>-v2.mp4"`.
3. Delete the old `<slug>-v1.mp4` from `public/videos/`. (It stays in git history, so only do this to keep the deploy small.)
4. Commit and deploy. Everyone gets the new file on their next visit. No cache purge is needed.

## Limits

- Keep each file near 10 MB: every re-export adds a full copy to git history, and the whole set is served from Vercel.
- Vercel Hobby allows about 100 GB of bandwidth a month, roughly 10,000 plays at 10 MB. Cloudflare in front reduces what Vercel serves. Check Vercel's and Cloudflare's current terms for video on free plans.
