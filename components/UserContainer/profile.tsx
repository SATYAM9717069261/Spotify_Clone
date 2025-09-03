"use client";

import { useMe } from "@hooks/useDetails";

interface ProfileProps {
  color: string;
  roundImage?: boolean;
}

export function Profile({ color, roundImage }: ProfileProps) {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="h-full">
        <div
          className="flex items-end p-10 animate-pulse"
          style={{ backgroundColor: "rgb(var(--background))" }}
        >
          <div className="p-5">
            <div
              className={`w-40 h-40 shadow-2xl`}
              style={{
                backgroundColor: "rgb(var(--card))",
                borderRadius: roundImage ? "100%" : "0.375rem",
              }}
            />
          </div>
          <div className="p-5 leading-10 flex flex-col space-y-2 w-full">
            <div
              className="h-3 w-16 rounded"
              style={{ backgroundColor: "rgb(var(--border))" }}
            />
            <div
              className="h-8 w-64 rounded"
              style={{ backgroundColor: "rgb(var(--border))" }}
            />
            <div
              className="h-3 w-32 rounded"
              style={{ backgroundColor: "rgb(var(--border))" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className={`flex items-end bg-[${color}] p-10`}>
        <div className="p-5">
          <img
            src="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
            alt={user?.title}
            className={`w-40 h-40 shadow-2xl ${
              roundImage ? "rounded-full" : "rounded-md"
            }`}
          />
        </div>
        <div className="p-5 text-white leading-10">
          <p className="text-[10px] font-bold uppercase">profile</p>
          <h1 className="text-6xl">{`${user?.firstName} ${user?.lastName}`}</h1>
          <p className="text-[10px]">{`${user?.playlistsCount} public Play list`}</p>
        </div>
      </div>
    </div>
  );
}
