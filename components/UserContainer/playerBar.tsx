"use client";
import { useStoreState } from "easy-peasy";

import Player from "./player";

export default function PlayerBar() {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <div className="h-[100px] w-screen bg-gray-900 p-2.5">
      <div className="flex items-center h-full">
        {activeSong ? (
          <div className="p-5 text-white w-1/3">
            <p className="text-lg font-medium">{activeSong.name}</p>
            <p className="text-sm text-gray-400">{activeSong.artist.name}</p>
          </div>
        ) : null}
        <div className="w-2/5">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </div>
      </div>
    </div>
  );
}
