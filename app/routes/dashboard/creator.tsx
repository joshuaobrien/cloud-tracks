import { Playlist } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { db } from '~/utils/db.server';
import fs from 'fs';
import youtubedl  from "youtube-dl-exec";
const { exec } = require('child_process');
const crypto = require('crypto');

type Chapter = {
  start_time: number,
  end_time: number,
  title: string,
}

// the included types are wrong. we fix them here for now.
// todo: fix this upstream
type Response = Awaited<ReturnType<typeof youtubedl>> & { chapters?: Chapter[] };

async function processUrl(url: string): Promise<{ title: string, path: string, tracks: Chapter[], thumbnail: string }> {
  console.log(`Ripping ${url}`);

  // for some reason this doesn't download the content.
  // for now we we just use it for metadata, and use the
  // dodgy exec for content
  const { title, thumbnail, chapters } = (await youtubedl(
    url,
    { extractAudio: true, dumpSingleJson: true, skipDownload: true },
    { }
  )) as Response;

  if (chapters == null) {
    throw new Error("world's best error handling");
  }

  const filename = crypto.randomUUID();
  // -f: force
  // ba: best audio
  // -x: audio only (I think)
  // -P: path
  // todo: investigate 'split-chapters' option
  exec(`yt-dlp -f 'ba' -x --audio-format mp3 ${url} -P "public/rips" -o "${filename}.%(ext)s"`);

  return {
    title,
    tracks: chapters,
    thumbnail,
    path: `rips/${filename}.mp3`
  }
}

async function submitUrl(url: string, userId: string): Promise<string> {
  const { title, path, tracks, thumbnail } = await processUrl(url)
  const { id } = await db.playlist.create({
    data: {
      name: title,
      userId,
      sourceUrl: url,
      thumbnailUrl: thumbnail, // todo: download this and host it ourselves
      path,
      tracks: {
        createMany: {
          data: tracks.map(({ title, start_time, end_time }) => ({ name: title, startTimeSeconds: start_time, endTimeSeconds: end_time })),
        }
      },
    }
  })

  return id;
}

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const maybeUrl = formData.get('url');

  if (typeof maybeUrl !== 'string') {
    return json({}, 400);
  }

  const userId = await requireUserId(request);
  const playlistId = await submitUrl(maybeUrl, userId);

  return redirect(`player/${playlistId}`);
};

export default function Creator() {
  return (
    <div className="flex flex-col flex-1 px-4 py-8 bg-sky-50">
      <h1 className="font-bold text-black text-9xl text-opacity-5 whitespace-nowrap">⏺️ What've you got?</h1>
      <form method="post" action="/dashboard/creator">
        <p>
          <label>
            URL: <input name="url" type="text" />
          </label>
        </p>
        <p>
          <button type="submit">Go get it</button>
        </p>
      </form>
    </div>
  )
}
