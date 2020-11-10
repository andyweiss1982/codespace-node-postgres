const express = require("express")
const { Pool } = require("pg")

const app = express()
const port = 3000

let connection = {
	host: 'localhost',
	port: 5432, 
	database: 'postgres', 
	user: 'postgres', 
	password: 'postgres' 
}

if (process.env.DATABASE_URL){
  connection = { connectionString: process.env.DATABASE_URL }
}

const db = new Pool(connection)

app.get("/", async (_, response) => {
  const { rows } = await db.query(`SELECT NOW();`)      
  response.send(`<h1>The current database time is ${rows[0].now}</h1>`)
})

app.listen(port, () => console.log(`Server on at http://localhost:${port}`))
