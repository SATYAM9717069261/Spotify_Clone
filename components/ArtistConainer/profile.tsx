interface ProfileProps {
  color: string;
  roundImage?: boolean;
  name: string;
  songsCount: number;
}

export const Profile = ({
  color,
  roundImage,
  name,
  songsCount,
}: ProfileProps) => {
  return (
    <div className="h-full">
      <div className={`flex items-end bg-[${color}] p-10`}>
        <div className="p-5">
          <div
            className={`w-40 h-40 shadow-2xl ${roundImage ? "rounded-full" : "rounded-md"} flex items-center justify-center`}
            style={{ fontSize: `10rem`, fontFamily: "Arial, sans-serif" }}
          >
            {name[0].toUpperCase()}
          </div>
        </div>
        <div className="p-5 text-white leading-10">
          <p className="text-[10px] font-bold uppercase">Artist</p>
          <h1 className="text-6xl">{`${name}`}</h1>
          <p className="text-[10px]">{`${songsCount} public Play list`}</p>
        </div>
      </div>
    </div>
  );
};
