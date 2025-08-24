import NextImage from "next/image";
import AppPref from "./AppPref";

function Sidebar() {
  return (
    <div className="container h-full">
      <div className="sidebar-header w-full p-6 flex align-items-center justify-center">
        <NextImage
          src="./logo.svg"
          height={60}
          width={120}
          alt="Spotify Logo"
        />
      </div>

      <div className="sidebar-content">
        <AppPref />
      </div>
    </div>
  );
}
export default Sidebar;
