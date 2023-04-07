import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });

async function connect() {
  if (redis.isOpen) return;
  await redis.connect();
}

export async function getBio() {
  await connect();
  const res = await redis.json.GET("about");
  return res;
}

export async function getProjects() {
  await connect();
  const res = await redis.json.GET("projects");
  return res;
}
