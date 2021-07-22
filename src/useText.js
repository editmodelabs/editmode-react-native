import React, { useEffect, useState } from "react";
import EventEmitter from "react-native-eventemitter";
import { getCachedData, storeCache, api } from "./utilities";

const useFetch = (id) => () => {
  const [chunks, setChunk] = useState([]);
  const cacheId = id + "_text_chunks";

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
      const url = `chunks?project_id=${id}`;
      fetchTextChunks(url, cachedChunk);
      EventEmitter.on("refreshChunk", () => fetchTextChunks(url, null));
    })();
  }, [id]);

  if (!chunks && !chunks.length) {
    return null;
  }
  let textChunks = {};
  if (chunks) {
    chunks.forEach((chunk) => {
      if (chunk["chunk_type"] == "single_line_text" || "long_text")
        return (textChunks[chunk["content_key"]] = chunk["content"]);
    });
  }
  return textChunks;
};

export function useText(projectId) {
  const getValues = useFetch(projectId);
  return [getValues];
}

export default useText;
