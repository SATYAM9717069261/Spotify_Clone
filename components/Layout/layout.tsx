import Sidebar from "@components/SideBar/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
            absolute
            grid
            grid-cols-[var(--side-menu-width)]
            grid-rows-[var(--side-menu-height)]
            h-full w-full
          "
    >
      <div className="row-span-2 bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="bg-gray-100">{children}</div>
      <div className="col-span-2 bg-black text-white">Player</div>
    </div>
  );
}

/**
 * <div className="w-full h-full relative">
         <div className="absolute top-0 left-0 w-side-menu bg-gray-900 text-white h-full">
           <Sidebar />
         </div>
         <div className="absolute top-0 ml-side-menu w-full bg-gray-100">
           {children}
         </div>
       </div>
       <div className="absolute left-0 bottom-0 w-full h-[80px] bg-black text-white">
         Player
       </div>
 */
