import { Hono } from "hono";

const app = new Hono();
app.get("/", (c) => c.text("Hello! Hono!"));

Bun.serve({
  port: parseInt(process.env.PORT),
  fetch: app.fetch,
});
