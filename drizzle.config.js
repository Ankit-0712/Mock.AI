import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_5tKC4NdOUHxc@ep-royal-cake-a5w8wq8q-pooler.us-east-2.aws.neon.tech/Mock%20Ai?sslmode=require"
  }
});
