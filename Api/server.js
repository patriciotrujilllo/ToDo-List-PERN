import express from 'express'
import { todosRouter } from './middleware/todo.controller.js'
import {config} from 'dotenv'
config()


const app = express()
app.use(express.json())

app.use('/todos',todosRouter)

const PORT = process.env.PORTAPI || '4000'

app.listen(PORT, ()=>{
	console.log(`server running on port ${PORT}`)
})

