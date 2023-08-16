import {Router} from 'express'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {pool} from '../db.js'

export const loginRouter = Router()

loginRouter.use((req,res,next)=>{
	res.append('Access-Control-Allow-Origin',['http://localhost:3000'])
	res.append('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
	res.append('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

loginRouter.post('/',async(req,res)=>{
    const {email,password} = req.body
    
    const result = await pool.query('SELECT * FROM users WHERE email=$1',[email])
    const user = Object.keys(result.rows[0]).length > 0 ? result.rows[0]: null
    
    const passwordIsCorrect = user=== null ? false : await bcrypt.compare(password,user.hashed_password)
        
    if(!passwordIsCorrect){
        return res.status(401).json({error:'Invalid user o password'})
    }
    const userForToken ={
        email:email
    }

    if(!process.env.Secret){
        throw new Error('Missing Secret environment variable')
    }

    const token = jsonwebtoken.sign(userForToken, process.env.Secret)
    const containToken = {
        email:email,
        token:token
    }

    res.status(200).json(containToken)
    
})