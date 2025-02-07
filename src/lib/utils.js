export function handleErrorResponse(message, status = 500) {
    return new Response(
      JSON.stringify({ error: message }),
      {
        status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  