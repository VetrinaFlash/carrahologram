function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

// Disabled for security. Never accept or expose Resend API keys through HTTP.
export async function onRequest() {
  return json({
    success: false,
    error: 'Endpoint disabilitato per sicurezza.'
  }, 410);
}
