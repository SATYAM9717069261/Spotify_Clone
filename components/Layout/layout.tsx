import Sidebar from "@components/SideBar/sidebar";
import PlayerBar from "@components/UserContainer/playerBar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=" absolute grid
      grid-rows-layout
      grid-cols-layout
      h-full w-full "
    >
      <div className="bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="bg-gray-100">{children}</div>
      <PlayerBar />
    </div>
  );
};

export default Layout;
