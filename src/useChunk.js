// @ts-check
import { useContext, useEffect, useState, useMemo } from "react";
import EventEmitter from "react-native-eventemitter";
import { EditmodeContext } from "./EditmodeContext";
import { api, computeContentKey } from './utilities'
import { renderChunk, getCachedData, storeCache, sanitizeContent } from './utilities'

export function useChunk(defaultContent = "", { identifier, type, contentKey, variables }) {
  const { projectId, defaultChunks, branch } = useContext(EditmodeContext);
  const [chunk, setChunk] = useState(undefined);

   if (!contentKey)  {
     contentKey = defaultContent ? computeContentKey(defaultContent) : null;
   }

  const cacheId = identifier || contentKey + projectId;

  let fallbackChunk;
  if (typeof defaultChunks !== 'undefined') {
    fallbackChunk = useMemo(
      () => {
        if (identifier) {
          return defaultChunks.find(chunkItem => chunkItem.identifier === identifier);
        } else {
          return defaultChunks.find(chunkItem => chunkItem.content_key === contentKey && chunkItem.project_id == projectId);
        }
      },
      [defaultChunks, identifier]
    );
  }

  useEffect(() => {
    // Render content
    (async () =>{
      let cachedChunk = await getCachedData(cacheId)
      

      const newChunk = cachedChunk ? JSON.parse(cachedChunk) : fallbackChunk || {
        chunk_type: type || "single_line_text",
        content: defaultContent,
        content_key: contentKey
      }

      if (newChunk) setChunk(sanitizeContent(newChunk, variables, fallbackChunk))
      // Fetch new data
      const branchParams = branch ? `&branch_id=${branch}` : "";
      const url = `chunks/${identifier || contentKey}?project_id=${projectId}${branchParams}`;
      sendApiRequest(url, cachedChunk)
      EventEmitter.on("refreshChunk", () => sendApiRequest(url, null));
    })();
  }, [cacheId]);

  function sendApiRequest(url, cachedChunk) {
    api
      .get(url)
      .then((res) => {
        storeCache(cacheId, res.data)
        if (!cachedChunk) {
          const parsedChunk = sanitizeContent(res.data, variables, fallbackChunk)
          setChunk(parsedChunk)
        }
      }) // Store chunk to localstorage
      .catch((error) => {
        console.warn(`Something went wrong trying to retrieve chunk data: ${error}. Have you provided the correct Editmode identifier (${identifier || contentKey}) as a prop to your Chunk component instance?`)
      }); 
  }

  if (chunk) {
    return {
      Component(props) {
        return renderChunk(chunk, props)
      },
      content: chunk.content
    };
  } else {
    return {
      Component() {
        return null
      }
    }
  }
}