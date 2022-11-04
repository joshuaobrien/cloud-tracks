import type { Playlist } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { requireUserId } from '~/utils/auth.server';
import { db } from '~/utils/db.server';

type LoaderData = { playlists: Playlist[] };

function getMockPlaylists(len: number = 7) {
  const names = ['Vibes', 'Beats', 'Tunes', 'Bops', 'Jams'];
  return new Array(len).fill(0).map(() => ({
    name: names[Math.floor(Math.random() * names.length)],
    id: Math.random().toString(),
    userId: 'ligma',
  }));
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const playlists = await db.playlist.findMany({
    where: {
      userId,
    },
  });

  const data: LoaderData = { playlists };
  return json(data);
};

export default function Library() {
  const { playlists } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col flex-1 px-4 py-8 bg-sky-50">
      <h1 className="font-bold text-black text-9xl text-opacity-5 whitespace-nowrap">🎧 Playlists</h1>
      <ul className="grid max-w-5xl grid-cols-3 gap-2 mt-12 sm:grid-cols-4 md:grid-cols-5">
        <li className="flex flex-col bg-rose-700 bg-opacity-5 aspect-square" key={'add'}>
          <div className="px-2 font-mono text-xs font-semibold text-gray-800 bg-rose-700 bg-opacity-5">
            <Link to="creator">
              Add new
            </Link>
          </div>
        </li>
        {playlists.map((playlist) => (
          <li
            style={{ backgroundImage: `url(${playlist.thumbnailUrl})`}}
            className={`flex flex-col aspect-square bg-no-repeat bg-cover bg-center`} key={playlist.id}>
            <div
              className="px-2 font-mono text-xs font-semibold text-white bg-opacity-5"
              style={{
                // so you can always see the text no matter the background colours
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"
              }}
            >
              <Link to={`player/${playlist.id}`}>
                {playlist.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
