import { Playlist } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import { db } from '~/utils/db.server';

const randomWords = [
  'stoat',
  'macbook',
  'marmalade',
  'skyline',
  'ebike',
  'bronte',
  'tea',
];

const getRandomWord = () => randomWords[Math.floor(Math.random() * randomWords.length)];

async function submitUrl(url: string, userId: string): Promise<string> {
  const { id } = await db.playlist.create({
    data: {
      name: `${getRandomWord()} ${getRandomWord()} ${getRandomWord()}`,
      userId,
      sourceUrl: url,
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
