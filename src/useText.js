import React, { useEffect, useState } from "react";
import { getCachedData, storeCache, api } from "./utilities";

export function useText(projectId) {
  const [chunks, setChunk] = useState([]);
  const cacheId = projectId + "_text_chunks";

  useEffect(() => {
    (async () => {
      const cachedChunk = await getCachedData(cacheId);
      if (cachedChunk) {
        const data = JSON.parse(cachedChunk);
        setChunk(data);
      }
      api
        .get(`chunks?project_id=${projectId}`)
        .then((res) => {
          if (res.data.error) throw res.data.error;
          storeCache(cacheId, res.data.chunks);
          if (!cachedChunk) setChunk(res.data.chunks);
        })
        .catch((error) => {
          console.error(
            `Something went wrong trying to retrieve chunk collection: ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
          );
        });
    })();
  }, [projectId]);

  if (!chunks && !chunks.length) {
    return null;
  }
  let text_content = {};
  if (chunks) {
    chunks.forEach((chunk) => {
      if (chunk["chunk_type"] == "single_line_text" || "long_text")
        return (text_content[chunk["content_key"]] = chunk["content"]);
    });
  }
  return text_content;
}
