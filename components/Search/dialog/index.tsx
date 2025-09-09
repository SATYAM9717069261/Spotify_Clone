import type { JSX } from "react";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { onScreenActionTypeSet } from "@components/OnScreenActions/type";
import { useSearch } from "@hooks/useSearch";
import Link from "next/link";
import { useStoreActions } from "easy-peasy";
import { Song, StoreModel } from "@libs/store";

const Dialog = ({ setter }: { setter: onScreenActionTypeSet }): JSX.Element => {
  const { setQuery, results, isLoading } = useSearch(600);
  const [recent, setRecent] = useState<{ title: string; subtitle?: string }[]>(
    [],
  );
  const playSongs = useStoreActions<StoreModel>(
    (actions) => actions.changeActiveSongs,
  );
  const setActiveSong = useStoreActions<StoreModel>(
    (actions) => actions.changeActiveSong,
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setter(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!results) return;
    setRecent([
      ...(results?.song?.map((song) => ({
        title: song.name,
        subtitle: "Song",
        url: song.url,
        artistId: song.artistId,
        id: song.id,
        duration: song.duration,
        name: song.name,
        url: song.url,
      })) || []),
      ...(results?.artist?.map((artist) => ({
        title: artist.name,
        subtitle: "Artist",
        redirection: "/artist/" + artist.id,
      })) || []),
    ]);
  }, [results]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 ${styles.dialog}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={`w-full max-w-2xl bg-[#1f2937] rounded-lg shadow-lg overflow-hidden ${styles.container}`}
      >
        {/* Header with search input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search documentation"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          />
          <span className="cursor-pointer" onClick={() => setter(null)}>
            {" "}
            close
          </span>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex justify-between flex-row items-center px-3 py-2 rounded-md bg-gray-800 animate-pulse"
                  >
                    <div
                      className="flex-1 space-y-2 flex-col"
                      style={{ width: "100%" }}
                    >
                      <div className="h-3 bg-gray-400 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-500 rounded w-3/4"></div>
                    </div>
                    <div className="h-5 w-5 bg-gray-600 rounded-full"></div>
                  </li>
                ))
              : recent.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
                  >
                    {(item?.redirection ?? false) ? (
                      <WithLink item={item} />
                    ) : (
                      <WithOutLink
                        item={item}
                        setActiveSong={setActiveSong}
                        playSongs={playSongs}
                      />
                    )}

                    <button className="text-gray-400 hover:text-white">
                      ×
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
const WithLink = ({ item }: { item: any }) => {
  return (
    <Link href={item?.redirection}>
      {item.subtitle && (
        <p className="text-xs text-gray-400">{item.subtitle}</p>
      )}
      <p className="text-white">{item.title}</p>
    </Link>
  );
};

const WithOutLink = ({
  item,
  setActiveSong,
  playSongs,
}: {
  item: any;
  setActiveSong: (song: Song) => void;
  playSongs: (songs: Song[]) => void;
}) => {
  const handlePlay = (activeSong?: Song) => {
    playSongs([item]);
    setActiveSong(activeSong);
  };

  console.log(" details => ", item);

  return (
    <div onClick={() => handlePlay(item)}>
      {item.subtitle && (
        <p className="text-xs text-gray-400">{item.subtitle}</p>
      )}
      <p className="text-white">{item.title}</p>
    </div>
  );
};

export default Dialog;
