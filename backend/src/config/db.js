import 'dotenv/config.js';
import { Pool } from 'pg';

// Asign certificate for connection supabase
const DBCertificate = process.env.DB_CERT ? process.env.DB_CERT.replace(/\\n/g, '\n') : undefined;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true,
        ca: DBCertificate
    }
});

export default pool;