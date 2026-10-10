// V35 safety middleware.
// Consent is handled by /api/consent before /api/subscribe.
// This file intentionally does nothing except continue the request.
export async function onRequest(context) {
  return context.next();
}
