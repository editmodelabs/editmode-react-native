import React, { useEffect, useState } from "react";
import EventEmitter from "react-native-eventemitter";
import { getCachedData, storeCache, api } from "./utilities";

export function useText(projectId, fetch = true) {
  const [chunks, setChunk] = useState([]);
  const cacheId = projectId + "_text_chunks";
  if (!fetch) return {};
  const fetchTextChunks = (url, cachedChunk) => {
    api
      .get(url)
      .then((res) => {
        if (res.data.error) throw res.data.error;
        storeCache(cacheId, res.data.chunks);
        if (!cachedChunk) setChunk(res.data.chunks);
      })
      .catch((error) => {
        console.error(
          `Something went wrong trying to retrieve the chunks ${error}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
        );
      });
  };

  useEffect(() => {
    (async () => {
      const cachedChunk = await getCachedData(cacheId);
      if (cachedChunk) {
        const data = JSON.parse(cachedChunk);
        setChunk(data);
      }
      const url = `chunks?project_id=${projectId}`;
      fetchTextChunks(url, cachedChunk);
      EventEmitter.on("refreshChunk", () => fetchTextChunks(url, null));
    })();
  }, [projectId]);

  if (!chunks && !chunks.length) {
    return null;
  }
  let text_content = {};
  if (chunks) {
    chunks.forEach((chunk) => {
      if (
        chunk["content_key"] !== null &&
        (chunk["chunk_type"] == "single_line_text" ||
          chunk["chunk_type"] == "long_text")
      )
        return (text_content[chunk["content_key"]] = chunk["content"]);
    });
  }
  return text_content;
}
