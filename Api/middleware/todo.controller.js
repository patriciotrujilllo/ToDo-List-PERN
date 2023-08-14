import { Router } from 'express'
import crypto from 'crypto'
import {validate, validatePartial } from '../validator/todos.validator.js'
import { pool } from '../db.js'
import  util  from 'util'


export const todosRouter = Router()

todosRouter.use((req,res,next)=>{
	res.append('Access-Control-Allow-Origin',['http://localhost:3000'])
	res.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
	res.append('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

todosRouter.get('/',async (req,res)=>{
	
	const todos = await pool.query('SELECT * FROM todos')
	res.json(todos.rows)
})

todosRouter.get('/:user_email',async (req,res)=>{
	const {user_email} = req.params
	console.log(user_email)

	const todos = await pool.query('SELECT * FROM todos WHERE user_email=$1',[user_email])
	res.json(todos.rows)
})

todosRouter.get('/:id',async (req,res)=>{

	const {id} = req.params
	const todo = await pool.query('SELECT * FROM todos WHERE id= $1',[id])
	// const todo = todos.find(todo=>todo.id===id)
	if (todo) return res.json(todo.rows[0])

	res.status(404).json({message: 'todo not found'})
})

todosRouter.post('/',async(req,res)=>{

	const result = validate(req.body)
	const date = new Date()


	if (result.error){
		return res.status(400).json({error: JSON.parse(result.error.message)})
	}
	const newtodo = {
		id: crypto.randomUUID(),
		date: date.toString(),
		...result.data
	}
	try{
		pool.query('INSERT INTO todos (id,user_email,title,progress,date) VALUES ($1,$2,$3,$4,$5)',[newtodo.id,newtodo.user_email, newtodo.title,newtodo.progress,newtodo.date])
		return res.status(200).json(newtodo)
	}catch (err){
		return res.status(400).json({error: 'error al insertar tarea en la BD', details: err.message})
	}
	
		// .then(()=>{
		// 	return res.status(201).json(newtodo)
		// }).catch(err=>{
		// 	return res.status(400).json({ error: 'Error al insertar la película en la base de datos', details: err.message })
		// })
    
})

todosRouter.put('/:id',async(req,res) =>{
	const {id} = req.params
	const result = validate(req.body)

	const date = new Date()

	if (result.error){
		return res.status(400).json({error: JSON.parse(result.error.message)})
	}

	try{
		const todo = await pool.query('SELECT * FROM todos WHERE id=$1',[id])
		if(todo.rowCount===0){
			return res.status(400).json({message: 'todo not found'})
		}
	}
	catch{
		return res.status(400).json({message: 'error query'})
	}
	const updateValues = Object.values(result.data)
	
	const updateQuery = 'UPDATE todos SET user_email=$1,title=$2,progress=$3,date=$4 WHERE id=$5'
	const valuesUpdate = [...updateValues,date.toString(),id]

	pool.query(updateQuery,valuesUpdate)
		.then(()=>{
			res.json(result.data)
		}).catch(()=>{
			res.status(400).json({message: 'error'})
		})

})

todosRouter.patch('/:id',async(req,res)=>{
    
	const {id} = req.params
	const result = validatePartial(req.body)
	const date = new Date()

	if (result.error){
		return res.status(400).json({error: JSON.parse(result.error.message)})
	}
	const updateKeys = Object.keys(result.data)
	const updateValues = Object.values(result.data)

	if (updateKeys.length === 0) {
		return res.status(400).json({ message: 'No updates provided' })
	}

	try{
		const todo = await pool.query('SELECT * FROM todos WHERE id=$1',[id])
		if(todo.rowCount===0){
			return res.status(400).json({message: 'todo not found'})
		}
	}
	catch{
		return res.status(400).json({message: 'error query'})
	}

	const updateQuery = `UPDATE todos SET ${updateKeys.map((key, i) => `${key} = $${i + 1}`).join(', ')}, date =$${updateKeys.length + 1} WHERE id = $${updateKeys.length + 2}`

	const values = [...updateValues,date.toString(),id]

	const valor = util.inspect(values)
	process.stdout.write(valor + '\n')

	const valor2 = util.inspect(updateQuery)
	process.stdout.write(valor2 + '\n')

	pool.query(updateQuery,values)
		.then(()=>{
			res.json(result.data)
		}).catch(()=>{
			res.status(400).json({message: 'error en el pool'})
		})
})

todosRouter.delete('/:id',async(req,res)=>{

	const {id} = req.params
	try{
		const del = await pool.query('DELETE FROM todos WHERE id=$1',[id])
		return res.status(200).json(del)
	}catch{
		return res.status(400)
	}
	
})