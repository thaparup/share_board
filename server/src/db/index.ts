import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
console.log("env", Bun.env.POSTGRES_URI);
const connectDb = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();

    console.log(`Connected to PostgreSQL:`);

    client.release();
    return true;
  } catch (error) {
    console.error("PostgreSQL connection failed:", error);
    return false;
  }
};

export default connectDb;
export { pool };
