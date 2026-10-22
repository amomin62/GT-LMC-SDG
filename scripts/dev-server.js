const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const port = Number(process.env.PORT) || 8765;
const reloadPath = "/__livereload";
const reloadScript = `<script>new EventSource("${reloadPath}").onmessage = () => location.reload();</script>`;
const clients = new Set();

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/mp4",
  ".mp3": "audio/mpeg"
};

let reloadTimer;
fs.watch(root, { recursive: true }, (event, file) => {
  if (!file || /(^|[\\/])(\.git|node_modules)([\\/]|$)/.test(file) || /(^|[\\/])\./.test(file)) return;
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    console.log(`Changed: ${file} — reloading browser`);
    clients.forEach((client) => client.write("data: reload\n\n"));
  }, 120);
});

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);

    if (urlPath === reloadPath) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-store",
        Connection: "keep-alive"
      });
      res.write(": connected\n\n");
      clients.add(res);
      req.on("close", () => clients.delete(res));
      return;
    }

    let filePath = path.normalize(path.join(root, urlPath));
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    fs.stat(filePath, (statError, stat) => {
      if (statError) {
        res.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const headers = {
        "Content-Type": types[ext] || "application/octet-stream",
        "Cache-Control": "no-store"
      };

      if (ext === ".html") {
        const html = fs.readFileSync(filePath, "utf8").replace("</body>", `${reloadScript}\n</body>`);
        res.writeHead(200, headers).end(html);
        return;
      }

      // Browsers request videos in byte ranges; without this, seeking breaks.
      headers["Accept-Ranges"] = "bytes";
      const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
      if (range) {
        const start = range[1] ? Number(range[1]) : 0;
        const end = range[2] ? Math.min(Number(range[2]), stat.size - 1) : stat.size - 1;
        res.writeHead(206, {
          ...headers,
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Content-Length": end - start + 1
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
      }

      res.writeHead(200, { ...headers, "Content-Length": stat.size });
      fs.createReadStream(filePath).pipe(res);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Site running at http://127.0.0.1:${port}`);
    console.log("The page reloads automatically when you save a file. Press Ctrl+C to stop.");
  });
