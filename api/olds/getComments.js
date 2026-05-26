console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL);
console.log("Redis Token present:", !!process.env.UPSTASH_REDIS_REST_TOKEN);

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  const { tag } = req.query;
  if (!tag) return res.status(400).json({ error: "Tag required" });

  try {
    const comments = await redis.lrange("comments", 0, -1);
    const parsed = comments.map(c => JSON.parse(c));
    const filtered = parsed.filter(c => c.tag === tag);
    res.status(200).json(filtered);
  } catch (err) {
    console.error("getComments error:", err);
    res.status(500).json({ error: "Server error fetching comments" });
  }
}