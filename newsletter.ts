import { Hono } from "hono";
import { logger } from "hono/logger";

import { Database } from "bun:sqlite";

interface Subscription {
  id: number;
  email: string;
}

const db = new Database();
// Pour stocker la base dans un fichier
// const db = new Database("newsletter.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS subscription (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)"
);

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  const subs = db.query("SELECT * FROM subscription").all();
  return c.json(subs);
});

app.post("/", async (c) => {
  const body = await c.req.json<Subscription>();
  const sub = db
    .query("SELECT * From subscription WHERE email = ?")
    .get<Subscription>(body.email);
  if (!sub) {
    db.run("INSERT INTO subscription (email) VALUES (?)", body.email);
    return c.json(body, 201);
  }

  return c.json(body, 409);
});

Bun.serve({
  port: parseInt(process.env.PORT),
  fetch: app.fetch,
});
