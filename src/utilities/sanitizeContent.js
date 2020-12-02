export const sanitizeContent = (chunk, variables, fallbackChunk) => {
  const tokens = (chunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let isVariableSafe = true;
  if (tokens) {
    tokens.forEach(function(token) {
      const value = variables && variables[token] || ""
      chunk.content = chunk.content.replace(`{{${token}}}`, value);
    });

    if (!value) isVariableSafe = false;
  }

  if ( !isVariableSafe && fallbackChunk) {
    chunk.content = fallbackChunk.content
  }

  return chunk
}
