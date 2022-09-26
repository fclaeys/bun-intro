Bun.serve({
  fetch(req: Request) {
    return new Response("Welcome to Bun with TS!");
  },
  port: 3000, // number or string
});
