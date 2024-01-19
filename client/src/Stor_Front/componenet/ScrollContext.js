import { createContext } from "react";

export const ScrollContext = createContext({
  sectionRef: { current: null },
  setSectionRef: () => {},
});
