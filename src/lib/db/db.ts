import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
const queryString = 'postgresql://postgres:toper999@db.iuqwgpatnpizhrgffrlq.supabase.co:5432/postgres';
export const connection = postgres(queryString);

export const db = drizzle({ client: connection });
