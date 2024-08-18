import { createClient } from "redis";

const client = createClient({
  url: "rediss://default:Ad0eAAIjcDE2ZmVjZWZjMzIwZTI0ZmVjOTg5M2I2OWU0MmI4ZmEyMnAxMA@sweet-stud-56606.upstash.io:6379",
  legacyMode: true,
});

client.on("error", function (err) {
  throw err;
});
await client.connect();

export { client };
