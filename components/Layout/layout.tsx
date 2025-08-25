import Sidebar from "@components/SideBar/sidebar";
// grid-cols-[var(--side-menu-width) 1fr ]
//  grid-rows-[1fr var(--side-menu-height)]]
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className=" absolute grid
      grid-rows-[var(--grid-rows)]
      grid-cols-[var(--grid-cols)]
      h-full w-full "
    >
      <div className="bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="bg-gray-100">{children}</div>
      <div className="col-span-2 bg-black text-white">Player</div>
    </div>
  );
}
