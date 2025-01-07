import express from "express";
import { db } from "./index";
import { usersTable } from "./db/schema";

const app = express();
const PORT = 3000;

// Simple route that beckons visitors
app.get("/", async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

// Start the server and transcend into the kaleidoscopic world of HTTP requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
