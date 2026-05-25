import { createReadStream, existsSync, statSync } from "node:fs";
import { appendFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5188);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".obj": "text/plain; charset=utf-8",
  ".mtl": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".usdz": "model/vnd.usdz+zip",
  ".webp": "image/webp",
};

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handleSubmission(request, response) {
  try {
    const body = JSON.parse(await readBody(request) || "{}");
    const errors = {};
    if (!body.type) errors.type = "Site type is required.";
    if (!body.websiteUrl) errors.websiteUrl = "Website URL is required.";
    if (!body.name) errors.name = "Name is required.";
    if (!body.email || !/\S+@\S+\.\S+/.test(body.email)) errors.email = "A valid email is required.";
    if (!body.costNow || Number(body.costNow) <= 0) errors.costNow = "Hosting cost must be positive.";

    if (Object.keys(errors).length) {
      sendJson(response, 400, { errors });
      return;
    }

    const record = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    await appendFile(join(root, "submissions.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
    sendJson(response, 201, { ok: true });
  } catch (error) {
    sendJson(response, 500, { error: "An error occurred while saving the submission." });
  }
}

async function handleProbe(url, response) {
  let site = url.searchParams.get("url");
  if (!site) {
    sendJson(response, 400, { error: "Missing url param" });
    return;
  }
  if (!/^https?:\/\//i.test(site)) site = `https://${site}`;

  const fallback = { t: 0.2, c: 0.75, mMB: 128, pageKB: 800, fallback: true };
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const start = Date.now();
    const result = await fetch(site, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 RiftsCalculator/1.0" },
    });
    const text = await result.text();
    clearTimeout(timeout);

    const seconds = Math.max(0.05, Math.min(2, (Date.now() - start) / 1000 - 0.25));
    const scripts = text.match(/<script[^>]*src=/gi)?.length || 0;
    const styles = text.match(/<link[^>]*stylesheet/gi)?.length || 0;
    const images = text.match(/<img[^>]*src=/gi)?.length || 0;
    let mMB = 64;
    if (/woocommerce/i.test(text)) mMB *= 1.6;
    if (/elementor/i.test(text)) mMB *= 1.3;
    if (/wordpress/i.test(text)) mMB *= 1.1;
    if (/wp-content.*plugin/i.test(text)) mMB *= 1.2;
    const pageKB = Math.max(100, Math.min(3000, text.length / 1024 + scripts * 50 + styles * 20 + images * 100));

    sendJson(response, 200, {
      t: Math.round(seconds * 100) / 100,
      c: 0.75,
      mMB: Math.round(mMB),
      pageKB: Math.round(pageKB),
    });
  } catch {
    sendJson(response, 200, fallback);
  }
}

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);

  if (request.method === "POST" && url.pathname === "/api/submission") {
    await handleSubmission(request, response);
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/probe") {
    await handleProbe(url, response);
    return;
  }

  const requested = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let filePath = join(root, requested === "/" ? "index.html" : requested);

  if (!existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }

  if (statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  response.writeHead(200, {
    "Content-Type": types[extname(filePath)] || "application/octet-stream",
    "Cross-Origin-Opener-Policy": "same-origin",
  });
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Rifts mock site running at http://127.0.0.1:${port}`);
});
