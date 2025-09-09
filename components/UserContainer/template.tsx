import { JSX } from "react/jsx-dev-runtime";
import { ArtistList } from "./artistList";
import { Profile } from "./profile";
import { Tracks } from "./tracks";

const UserDetails = (): JSX.Element => {
  const color = "#16a34a";
  return (
    <div
      className="grid grid-template-rows-[auto_1fr] h-[var(--user-details-height)] overflow-y-auto overflow-x-hidden"
      style={{
        backgroundImage: `linear-gradient(${color} 10%,
        ${color} 21%, ${color} 43%, rgba(0,0,0,0.95) 97%)`,
      }}
    >
      <Profile color={color} roundImage={true} />
      <div className="grid grid-rows-2 ">
        <ArtistList />
        <Tracks />
      </div>
    </div>
  );
};

export default UserDetails;
