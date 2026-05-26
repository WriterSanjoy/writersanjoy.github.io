console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("Redis Token present:", !!process.env.UPSTASH_REDIS_REST_TOKEN);

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, comment, tag } = req.body;
    if (!name || !comment || !tag) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const newComment = { id: Date.now(), name, comment, tag, date: new Date().toISOString() };
    try {
      const result = await redis.rpush("comments", JSON.stringify(newComment));
      res.status(200).json({ success: true, comment: newComment, result });
    } catch (err) {
      console.error("postComment error:", err);
      res.status(500).json({ error: "Server error saving comment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}