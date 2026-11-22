import 'dotenv/config.js'
import {Pool} from 'pg'


// create postgres client
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});