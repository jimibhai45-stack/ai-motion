const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8"
};

function response(data, status, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...headers }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";

    const headers = {
      "Access-Control-Allow-Origin":
        origin === allowedOrigin ? origin : "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return response({
        ok: true,
        message: "AI Video API is running"
      }, 200, headers);
    }

    if (url.pathname !== "/generate") {
      return response({ error: "Route not found" }, 404, headers);
    }

    if (request.method !== "POST") {
      return response({ error: "Use POST request" }, 405, headers);
    }

    if (!origin || origin !== allowedOrigin) {
      return response({
        error: "Website origin is not allowed"
      }, 403, headers);
    }

    let form;

    try {
      form = await request.formData();
    } catch {
      return response({
        error: "Invalid form data"
      }, 400, headers);
    }

    const mode = form.get("mode");
    const prompt = form.get("prompt");

    if (!["image", "prompt"].includes(mode)) {
      return response({ error: "Invalid video mode" }, 400, headers);
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
      return response({ error: "Please enter a prompt" }, 400, headers);
    }

    if (!env.HF_TOKEN) {
      return response({
        error: "AI provider token is not configured yet"
      }, 503, headers);
    }

    return response({
      error: "AI provider connection is not implemented yet. No video was generated."
    }, 501, headers);
  }
};
