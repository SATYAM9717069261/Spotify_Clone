"use client";

import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "@libs/formatters";

const Player = ({ songs, activeSong }: { songs: any[]; activeSong: any }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex((s: any) => s.id === activeSong.id),
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef<any>(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  useEffect(() => {
    let timerId: number = 0;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = (): void => setShuffle((s) => !s);
  const onRepeat = (): void => setRepeat((s) => !s);

  const prevSong = (): void =>
    setIndex((state: any) => (state ? state - 1 : songs.length - 1));

  const nextSong = (): void =>
    setIndex((state: any) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) return nextSong();
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });

  const onEnd = (): void => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = (): void => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e: any): void => {
    const value = parseFloat(e.target.value);
    setSeek(value);
    soundRef.current.seek(value);
  };

  return (
    <div className="w-full">
      <ReactHowler
        playing={playing}
        src={activeSong?.url}
        ref={soundRef}
        onLoad={onLoad}
        onEnd={onEnd}
      />

      {/* Controls */}
      <div className="flex justify-center items-center text-gray-600 space-x-4">
        <button
          aria-label="shuffle"
          onClick={onShuffle}
          className={`text-2xl hover:text-white ${
            shuffle ? "text-white" : "text-gray-600"
          }`}
        >
          <MdShuffle />
        </button>
        <button
          aria-label="prev"
          onClick={prevSong}
          className="text-2xl hover:text-white"
        >
          <MdSkipPrevious />
        </button>

        {playing ? (
          <button
            aria-label="pause"
            onClick={() => setPlayState(false)}
            className="text-4xl text-white hover:scale-110 transition"
          >
            <MdOutlinePauseCircleFilled />
          </button>
        ) : (
          <button
            aria-label="play"
            onClick={() => setPlayState(true)}
            className="text-4xl text-white hover:scale-110 transition"
          >
            <MdOutlinePlayCircleFilled />
          </button>
        )}

        <button
          aria-label="next"
          onClick={nextSong}
          className="text-2xl hover:text-white"
        >
          <MdSkipNext />
        </button>
        <button
          aria-label="repeat"
          onClick={onRepeat}
          className={`text-2xl hover:text-white ${
            repeat ? "text-white" : "text-gray-600"
          }`}
        >
          <MdOutlineRepeat />
        </button>
      </div>

      {/* Seek bar */}
      <div className="flex items-center justify-center text-gray-400 mt-2 space-x-2">
        <span className="text-xs w-10 text-right">{formatTime(seek)}</span>
        <input
          type="range"
          step="0.1"
          min={0}
          max={duration ? duration.toFixed(2) : 0}
          value={seek}
          onChange={onSeek}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={() => setIsSeeking(false)}
          className="w-4/5 accent-gray-600 cursor-pointer"
        />
        <span className="text-xs w-10 text-left">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default Player;
