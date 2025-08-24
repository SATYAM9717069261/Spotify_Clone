import Sidebar from "@components/SideBar/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" absolute grid grid-cols-[var(--side-menu-width)] grid-rows-[var(--side-menu-height)] h-full w-full ">
      <div className="row-span-2 bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="bg-gray-100">{children}</div>
      <div className="col-span-2 bg-black text-white">Player</div>
    </div>
  );
}
