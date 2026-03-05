export async function onRequest(context) {
  // Leggiamo il KV. Nota: 'VISITOR_COUNT' sarà il nome del binding che imposteremo dopo
  let count = await context.env.VISITOR_COUNT.get("visitors");
  
  if (!count) {
    count = 6000;
  } else {
    count = parseInt(count) + 1;
  }

  // Salviamo in background
  context.waitUntil(context.env.VISITOR_COUNT.put("visitors", count.toString()));

  // Restituiamo il JSON
  return new Response(JSON.stringify({ count: count }), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}