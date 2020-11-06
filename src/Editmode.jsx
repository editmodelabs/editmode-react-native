// @ts-check
import React from "react";
import { EditmodeContext } from "./EditmodeContext";

export function Editmode({ children, projectId, defaultChunks }) {
  if (!projectId) {
    throw new Error("<Editmode projectId={...}> is missing a valid projectId");
  }

  let branch;

  return (
    <EditmodeContext.Provider value={{ branch, projectId, defaultChunks }}>
      {children}
    </EditmodeContext.Provider>
  );
}
export default Editmode;