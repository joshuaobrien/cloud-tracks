import { useParams } from "@remix-run/react"

export default function Player() {
    const params = useParams();

    return (
        <div className="flex flex-col flex-1 px-4 py-8 bg-sky-50">
        <h1 className="font-bold text-black text-9xl text-opacity-5 whitespace-nowrap">{`🎶 Playback (${params.playlistId})`}</h1>
        </div>
    )
}
