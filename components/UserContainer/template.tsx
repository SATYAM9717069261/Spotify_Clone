import { ArtistList } from "./artistList";
import { Profile } from "./profile";
import { Tracks } from "./tracks";

export default function UserDetails() {
  const color = "#16a34a";
  return (
    <div
      className="grid grid-template-rows-[auto_1fr] h-[var(--user-details-height)] overflow-auto"
      style={{
        backgroundImage: `linear-gradient(${color} 0%,
        ${color} 15%, ${color} 40%, rgba(0,0,0,0.95) 75%)`,
      }}
    >
      <Profile
        color={color}
        subtitle="profile"
        title="NAME HERE "
        description="15 public Play list"
        image={
          "https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
        }
        roundImage={true}
      />
      <div className="grid grid-rows-2 ">
        <ArtistList />
        <Tracks />
      </div>
    </div>
  );
}
