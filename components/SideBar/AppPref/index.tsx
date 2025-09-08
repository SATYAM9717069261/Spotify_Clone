import Link from "next/link";
import navMenu from "./menu";
import type { onScreenActionTypeSet } from "@components/OnScreenActions/type";

const AppPref = ({
  addElement,
  clearElement,
}: {
  addElement: (
    element: onScreenActionTypeSet,
    clearElement: () => void,
  ) => void;
}) => {
  console.log(" details => ", addElement, clearElement);
  return (
    <div className="sidebar-content p-4">
      <ul className="sidebar-menu space-y-1">
        {navMenu.map((item, index) => (
          <li key={index} className="sidebar-item">
            {item?.path ? (
              <Link
                href={item.path}
                className="sidebar-link flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <div
                className="sidebar-link flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                onClick={() => {
                  const result = item?.action?.(addElement) ?? undefined;
                  if (
                    result &&
                    typeof result === "object" &&
                    "type" in result
                  ) {
                    // action returned JSX
                    addElement({ dom: result });
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppPref;
