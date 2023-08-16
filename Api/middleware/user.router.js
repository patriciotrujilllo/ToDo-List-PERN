import { Router } from "express";
import { pool } from '../db.js'
import bcrypt from 'bcrypt'
import { validate } from "../validator/user.validator.js"
import jsonwebtoken from 'jsonwebtoken'

export const usersRouter = Router()

usersRouter.use((req,res,next)=>{
	res.append('Access-Control-Allow-Origin',['http://localhost:3000'])
	res.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
	res.append('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

usersRouter.get('/',async(req,res)=>{
    try{
        const users = await pool.query('SELECT * FROM users')
        res.status(200).json(users.rows)
    }catch (err){
        return res.status(400).json({err: 'query error',details:err.message})
    }
})
usersRouter.post('/',async(req,res)=>{
    const result = validate(req.body)
    if (result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const {email,password} = result.data

    try{
        const e = await pool.query('SELECT * FROM users WHERE email=$1',[email])
        if(e.rows.length>0){
            const error = new Error('registered user')
            return res.status(400).json({ message: error.message })
        }
    }catch(err){
        return res.status(400).json(err)
    }
    const userforToken = {
        email: email
    }
    const token = jsonwebtoken.sign(userforToken,process.env.Secret)
    // const token = jwt.sign(userForToken, secret, { expiresIn: '1h' })
    try{
        const hashed_password = await bcrypt.hash(password,10)
        await pool.query('INSERT INTO users (email, hashed_password) VALUES($1,$2)',[email,hashed_password])
        const containToken = {
            email: email,
            token: token
        }
        return res.status(200).json(containToken)
    }catch(err){
        return res.status(400).json({err: 'query error',details: err.message})
    }
})
usersRouter.delete('/:email',async(req,res)=>{
    const {email} = req.params

    try {
        await pool.query('DELETE FROM users WHERE email=$1',[email])
        res.status(200).json('user delete')
    } catch (err) {
        res.status(400).json({err : 'user deleted',details: err.message})
    }
})