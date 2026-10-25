# MotionForge AI — Backend Setup

## 1. What this project does

This project provides the backend foundation for an AI video
generation website hosted on GitHub Pages.

The frontend supports:
- Text prompt input
- Image upload
- Video aspect ratio selection
- Video duration selection

## 2. Important limitation

The backend currently validates requests but does not generate
videos until a compatible AI video provider is integrated.

A Cloudflare Worker alone does not provide unlimited AI video
generation or free GPU processing.

## 3. Deploy the backend

1. Sign in to your Cloudflare account.
2. Open Workers & Pages.
3. Create a new Worker.
4. Open its code editor.
5. Paste the code from worker/index.js.
6. Deploy the Worker.
7. Copy the deployed Worker URL.

## 4. Configure the website

Open app.js in the GitHub repository.

Replace:

const API_BASE = "";

with your deployed Worker URL, for example:

const API_BASE = "https://your-worker.your-subdomain.workers.dev";

Use your actual URL, not the example.

## 5. Configure the allowed website origin

Set the Worker environment variable ALLOWED_ORIGIN to:

https://jimibhai45-stack.github.io

If your GitHub Pages site uses a different address, use that
exact origin instead.

## 6. Connect an AI provider

Before video generation can work, select a provider that supports
the required prompt-to-video and/or image-to-video features.

Follow that provider's official API documentation and configure
its API token as a secret on the backend.

Never put private API tokens in app.js or any public GitHub file.

## 7. Test the backend

Open:

https://YOUR-WORKER-URL/health

Replace YOUR-WORKER-URL with your deployed Worker address.

A successful health response means the Worker is running.
It does not mean video generation is connected.
