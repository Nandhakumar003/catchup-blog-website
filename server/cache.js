import { createClient } from "redis";

//upstash Connection;
const client = createClient({
  url: "rediss://default:Ad0eAAIjcDE2ZmVjZWZjMzIwZTI0ZmVjOTg5M2I2OWU0MmI4ZmEyMnAxMA@sweet-stud-56606.upstash.io:6379",
  legacyMode: true,
});

//Redix Connection;
/*const client = createClient({
  password: "1BvPolIa6wBw1oMI91LXm5574BAjn0SK",
  socket: {
    host: "redis-19282.c1.asia-northeast1-1.gce.redns.redis-cloud.com",
    port: 19282,
  },
});*/

/*client.on("error", function (err) {
  throw err;
});*/
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Connected to Redis DB"));
client.on("ready", () => console.log("Ready to use Redis DB"));
client.on("end", () => console.log("Client disconnected from Redis DB"));

(async () => {
  await client.connect();

  // isOpen will return True here as the client's socket is open now.
  // isReady will return True here, client is ready to use.
  console.log(
    `client.isOpen: ${client.isOpen}, client.isReady: ${client.isReady}`
  );
})();

process.on("SIGINT", async () => {
  await client.disconnect();
  process.exit(0);
});

//await client.connect();

export { client };
