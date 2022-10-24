import { json, LoaderFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react"
import { requireUserId } from "~/utils/auth.server";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const id = params.playlistId;

  if (userId == null || id == null) {
    return json({}, { status: 400});
  }

  const playlist = db.playlist.findUnique({
    where: {
      id,
    }
  });

  return json({ playlist });
}

export default function Player() {
  const params = useParams();


  return (
    <div className="flex flex-col flex-1 px-4 py-8 bg-sky-50">
      <h1 className="font-bold text-black text-9xl text-opacity-5 whitespace-nowrap">{`🎶 Playback (${params.playlistId})`}</h1>
      {
        JSON.stringify(params)
      }
    </div>
  )
}
