import type { JSX } from "react";
import { useEffect } from "react";
import styles from "./style.module.css";
import { onScreenActionTypeSet } from "@components/OnScreenActions/type";

const Dialog = ({ setter }: { setter: onScreenActionTypeSet }): JSX.Element => {
  console.log(" detail => ", setter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log(" settle => ", setter);
        setter(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const recent = [
    { title: "z-index" },
    { title: "filter: blur()", subtitle: "Examples" },
    {
      title: "Modal Dialogs",
      subtitle: "Components / Application UI / Overlays",
    },
    { title: "Buttons", subtitle: "Components / Application UI / Elements" },
  ];
  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 ${styles.dialog}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className={`w-full max-w-2xl bg-[#1f2937] rounded-lg shadow-lg overflow-hidden ${styles.container}`}
      >
        {/* Header with search input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search documentation"
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          />
          <span className="cursor-pointer" onClick={() => setter(null)}>
            {" "}
            close
          </span>
        </div>

        {/* Recent Section */}
        <div className="p-4">
          <h3 className="text-sm text-gray-400 mb-2">Recent</h3>
          <ul className="space-y-2">
            {recent.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer"
              >
                <div>
                  {item.subtitle && (
                    <p className="text-xs text-gray-400">{item.subtitle}</p>
                  )}
                  <p className="text-white">{item.title}</p>
                </div>
                <button className="text-gray-400 hover:text-white">×</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
