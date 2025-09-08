import type { onScreenActionTypeSet } from "@components/OnScreenActions/type";

import { useState } from "react";

export default function useAddElement(initial?: onScreenActionTypeSet) {
  const [element, setElement] = useState<onScreenActionTypeSet>(
    initial ?? null,
  );
  const addElement = (newElement: onScreenActionTypeSet) => {
    setElement(newElement);
  };

  const clearElement = () => {
    setElement(null);
  };

  return { element, addElement, clearElement };
}
