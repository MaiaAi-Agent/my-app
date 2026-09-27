// Local stand-in for the n8n webhook: logs every POST body, answers 200.
// Usage: node fake-webhook.mjs [port=3999]
import { createServer } from "node:http";

const port = Number(process.argv[2] ?? 3999);
createServer((req, res) => {
  let body = "";
  req.on("data", (c) => {
    body += c;
  });
  req.on("end", () => {
    if (req.method === "POST") console.log("PAYLOAD", body);
    res.end("ok");
  });
}).listen(port, () => console.log(`fake webhook on :${port}`));
