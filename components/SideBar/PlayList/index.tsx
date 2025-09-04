import Link from "next/link";
import navMenu from "./menu";

export default function PlayList({ playlists }: { playlists: any }) {
  return (
    <div className="sidebar-content p-4 h-[var(--playlist-height)] overflow-auto">
      <ul className="sidebar-menu space-y-1 ">
        {playlists.map((item: any, index: number) => (
          <li key={index} className="sidebar-item">
            <Link
              href={`/playlist/${item.id}`}
              prefetch={false}
              className="sidebar-link flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <span className="truncate">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
