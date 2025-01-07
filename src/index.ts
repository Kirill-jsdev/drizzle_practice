import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";

export const db = drizzle(process.env.DB_FILE_NAME!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };
  await db.insert(usersTable).values(user);
  console.log("New user created!");
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  const usersNames = await db.select({ customFieldName: usersTable.name }).from(usersTable);
  console.log("Getting all users from the database: ", usersNames);

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");
}
// main();
