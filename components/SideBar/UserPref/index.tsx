import Link from "next/link";
import navMenu from "./menu";

export default function UserPref() {
  return (
    <div className="sidebar-content p-4">
      <ul className="sidebar-menu space-y-2">
        {navMenu.map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link
              href={item.path}
              className="sidebar-link flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
