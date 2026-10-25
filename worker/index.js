const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8"
};

function response(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...JSON_HEADERS,
      ...headers
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowedOrigin = env.ALLOWED_ORIGIN || "";

    const originAllowed =
      origin !== "" && origin === allowedOrigin;

    const corsHeaders = {
      "Access-Control-Allow-Origin": originAllowed
        ? origin
        : "null",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return response({
        ok: true,
        service: "MotionForge AI Backend",
        status: "running",
        videoAI: "not connected"
      }, 200, corsHeaders);
    }

    if (url.pathname !== "/generate") {
      return response({
        error: "Route not found"
      }, 404, corsHeaders);
    }

    if (request.method !== "POST") {
      return response({
        error: "POST request required"
      }, 405, corsHeaders);
    }

    if (!originAllowed) {
      return response({
        error: "Website origin is not allowed",
        receivedOrigin: origin || "missing",
        expectedOrigin: allowedOrigin || "not configured"
      }, 403, corsHeaders);
    }

    let form;

    try {
      form = await request.formData();
    } catch {
      return response({
        error: "Invalid form data"
      }, 400, corsHeaders);
    }

    const mode = form.get("mode");
    const prompt = form.get("prompt");
    const image = form.get("image");

    if (mode !== "image" && mode !== "prompt") {
      return response({
        error: "Invalid video mode"
      }, 400, corsHeaders);
    }

    if (typeof prompt !== "string" || !prompt.trim()) {
      return response({
        error: "Please enter a video prompt"
      }, 400, corsHeaders);
    }

    if (mode === "image" && !(image instanceof File)) {
      return response({
        error: "Please upload an image"
      }, 400, corsHeaders);
    }

    if (image instanceof File) {
      if (!image.type.startsWith("image/")) {
        return response({
          error: "Please upload a valid image"
        }, 400, corsHeaders);
      }

      if (image.size > 10 * 1024 * 1024) {
        return response({
          error: "Image must be under 10 MB"
        }, 413, corsHeaders);
      }
    }

    return response({
      error: "AI video provider is not connected yet. No video was generated."
    }, 503, corsHeaders);
  }
};
