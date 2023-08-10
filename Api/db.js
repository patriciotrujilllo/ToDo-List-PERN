import pg from 'pg'
import {config} from 'dotenv'

config()
const { Pool } = pg
export const pool = new Pool({
	user: process.env.user,
	password: process.env.password,
	host: process.env.host,
	port: process.env.port,
	database: process.env.database
})