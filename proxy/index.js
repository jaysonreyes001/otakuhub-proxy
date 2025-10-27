const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const NodeCache = require('node-cache');
app.use(cors());


// Initialize cache with a TTL of 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

// Simple proxy route for m3u8 and segments
app.get("/proxy", async (req, res) => {
  const targetUrl = decodeURIComponent(req.query.url);
  if (!targetUrl) {
    return res.status(400).send("Missing ?url parameter");
  }


  // Check cache for the URL
    const cachedResponse = cache.get(targetUrl);
    if (cachedResponse) {
      return res.status(200).send(cachedResponse);
    }

  try {
    const refererUrl = 'https://megacloud.club/';
    const response = await fetch(targetUrl, {
      headers: {
        "Referer": refererUrl,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Origin": new URL(refererUrl).origin,
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "Cache-Control", "s-maxage=86400, stale-while-revalidate=59",
      },
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch target");
    }

    // Handle .m3u8 playlist files (text)
    if (targetUrl.endsWith('.m3u8')) {
      const txt = await response.text();
      const rewritten = txt
        .split('\n')
        .map(line => {
          if (line === '' || line.startsWith('#')) return line;
          let abs;
          try {
            abs = new URL(line, targetUrl).toString();
          } catch (e) {
            return line; // leave as-is if weird
          }
          return `/proxy?url=${encodeURIComponent(abs)}`;
        })
        .join('\n');

      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");

      // Cache the response
      cache.set(targetUrl, rewritten);
      res.send(rewritten);
    }
    // Handle binary responses (like .ts, .mp4, .key, etc.)
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType || "application/octet-stream");
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
