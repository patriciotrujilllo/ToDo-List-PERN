import express from 'express'
import { todosRouter } from './middleware/todo.controller.js'
import { usersRouter } from './middleware/user.router.js'
import { loginRouter } from './middleware/login.js'
import {config} from 'dotenv'
config()


const app = express()
app.use(express.json())

app.use('/todos',todosRouter)
app.use('/users',usersRouter)
app.use('/login',loginRouter)

const PORT = process.env.PORTAPI || '4000'

app.listen(PORT, ()=>{
	console.log(`server running on port ${PORT}`)
})

