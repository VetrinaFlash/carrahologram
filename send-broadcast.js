function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

// Deprecated in V37.
// The mass-mailing system now uses Resend Broadcasts through /api/resend-admin.
export async function onRequest() {
  return json({
    success: false,
    error: 'Endpoint dismesso. Usa il pannello subscribers.html, che ora invia con Resend Broadcasts.'
  }, 410);
}
