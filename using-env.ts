Bun.serve({
  fetch(req: Request) {
    return new Response("Welcome to Bun with environment variables !");
  },
  port: parseInt(process.env.PORT),
});
