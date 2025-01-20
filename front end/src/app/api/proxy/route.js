export const config = {
    runtime: 'edge', // Ensures this API runs on the Edge Runtime
  };
  
  export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');
  
    if (!targetUrl) {
      return new Response(JSON.stringify({ error: "Missing 'url' query parameter" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    try {
      // Fetch the external URL
      const response = await fetch(targetUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      // Forward the response body
      const text = await response.text();
      return new Response(text, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  