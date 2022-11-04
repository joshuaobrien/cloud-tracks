import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { useCallback } from "react";
import { useRef } from "react";
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

type LoaderType = Awaited<ReturnType<typeof loader>>;

const getPlaylistAndTracks = async ({ playlistId }: { playlistId: string }) => {
  const maybePlaylist = db.playlist.findUnique({
    where: {
      id: playlistId,
    }
  });

  const maybeTracks = db.track.findMany({
    where: {
      playlistId: playlistId,
    }
  });

  const [playlist, tracks] = await Promise.all([maybePlaylist, maybeTracks])

  return { playlist, tracks };
}


export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const id = params.playlistId;

  if (userId == null || id == null) {
    return json({}, { status: 400 });
  }

  const { playlist, tracks } = await getPlaylistAndTracks({ playlistId: id });

  return json({ playlist, tracks });
}

export default function Player() {
  const data = useLoaderData<Awaited<ReturnType<typeof getPlaylistAndTracks>>>();
  const ref = useRef<HTMLAudioElement>(null);

  const updateCurrentTime = (newTime: number) => {
    if (ref.current != null) {
      ref.current.currentTime = newTime;
    }
  }
  

  // todo: handle the case where the playlist doesn't exist

  return (
    <div className="flex flex-col flex-1 px-4 py-8 bg-sky-50">
      <h1 className="font-bold text-black text-9xl text-opacity-5 whitespace-nowrap">{`🎶 (${data.playlist!.name})`}</h1>
      <audio
        autoPlay
        controls
        ref={ref}
        src={`/${data.playlist!.path}`}
      />
      <img src={data.playlist!.thumbnailUrl ?? undefined} width={400} height={400} />
      <ol>
        {
          data.tracks.map((track, index) => (
            <TrackItem
              num={index + 1}
              name={track.name}
              startTimeSeconds={track.startTimeSeconds}
              endTimeSeconds={track.endTimeSeconds}
              updateCurrentTime={updateCurrentTime}
            />
          ))
        }
      </ol>
    </div>
  )
}

const TrackItem = ({
    num,
    name,
    startTimeSeconds,
    endTimeSeconds,
    updateCurrentTime
  }: {
    num: number,
    name: string,
    startTimeSeconds: number,
    endTimeSeconds: number,
    updateCurrentTime: (time: number) => void }
  ) => {

  const onClick = useCallback(() => {
    updateCurrentTime(startTimeSeconds);
  }, [updateCurrentTime, startTimeSeconds]);

  return (
    <li onClick={onClick}>
      {`${num}: ${name} (${secondsToTimestamp(startTimeSeconds)} - ${secondsToTimestamp(endTimeSeconds)})`}
    </li>
  );
}


function secondsToTimestamp(rawSeconds: number) {
  const hours = `${(Math.floor(rawSeconds / 3600))}`.padStart(2, '0')
  const minutes = `${Math.floor(rawSeconds % 3600 / 60)}`.padStart(2, '0');
  const _seconds = `${rawSeconds % 60}`.padStart(2, '0');

  return `${hours}:${minutes}:${_seconds}`;
}
