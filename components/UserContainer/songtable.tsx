"use client";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatDate, formatTime } from "@libs/formatters";
import { Song, StoreModel } from "@libs/store";

interface SongTableProps {
  songs: Song[];
}

export default function SongTable({ songs }: SongTableProps) {
  const playSongs = useStoreActions<StoreModel>(
    (actions) => actions.changeActiveSongs,
  );
  const setActiveSong = useStoreActions<StoreModel>(
    (actions) => actions.changeActiveSong,
  );

  const handlePlay = (activeSong?: Song) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <div className="bg-transparent text-white">
      <div className="p-2.5 mb-5">
        <div className="mb-7.5">
          <button
            onClick={() => handlePlay()}
            className="bg-green-500 hover:bg-green-600 text-black rounded-full p-4 flex items-center justify-center shadow-lg transition"
            aria-label="play"
          >
            <BsFillPlayFill className="text-[30px]" />
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="pb-2 font-medium">#</th>
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Date Added</th>
              <th className="pb-2 font-medium">
                <AiOutlineClockCircle />
              </th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, i) => (
              <tr
                key={song.id}
                onClick={() => handlePlay(song)}
                className="cursor-pointer transition-colors hover:bg-white/10"
              >
                <td className="py-2">{i + 1}</td>
                <td className="py-2">{song.name}</td>
                <td className="py-2">
                  {song.createdAt
                    ? formatDate(
                        typeof song.createdAt === "string"
                          ? new Date(song.createdAt)
                          : song.createdAt,
                      )
                    : "Unknown"}
                </td>
                <td className="py-2">{formatTime(song.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
