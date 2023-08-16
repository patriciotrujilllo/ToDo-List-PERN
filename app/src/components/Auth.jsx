import { useState } from 'react'
import { createUser } from '../services/users.services.js'
import {useCookies} from 'react-cookie'

export const Auth = () =>{
	const [login,setlogin] = useState(true)
	const [messageError,setMessageError] = useState('')
	const [cookies,setCookie] = useCookies(null)
	const [data,setData] = useState({
		email:'',
		password:'',
		confirm:''
	})

	const handleChange = (e) =>{
		const name = e.target.name
		const value = e.target.value
		if(name==='email'){
			setData(prevState=>({
				...prevState,
				[name]:value
			}))
		}
		if(name==='password'){
			setData(prevState=>({
				...prevState,
				[name]:value
			}))
		}
		if(name==='confirm'){
			setData(prevState=>({
				...prevState,
				[name]:value
			}))
		}

	}

	const handleSubmit = async(e) =>{
		e.preventDefault()
		try {
			const user = await createUser(data)
			setCookie('user',user)
			console.log(cookies)
		}catch (err) {
			console.error(err.message)
			setMessageError(err.message)
		}
	}
	return(
		<div className="auth-container">
			<div className='auth-container-box'>
				<h2>{login?'Please log in':'Please sign up'}</h2>
				<form className="input-container" onSubmit={(e)=>handleSubmit(e)}>
					<input value={data.email} placeholder='email' name='email' type="text" onChange={(e)=>handleChange(e)}/>
					<input value={data.password} placeholder='password' name='password' type="password" onChange={(e)=>handleChange(e)}/>
					{!login?<input value={data.confirm} type='password' name='confirm' placeholder="confirm password" onChange={(e)=>handleChange(e)}/>:''}
					{messageError && <h3>{messageError}</h3>}
					<button className='submit'>submit</button>
				</form>
				<div className="button-auth-container">
					<button className={login ? 'loginactive' : 'logindeactivated'} onClick={()=>setlogin(true)}>login</button>
					<button className={login ? 'logindeactivated' : 'loginactive'} onClick={()=>setlogin(false)}>sign up</button>
				</div>
			</div>
		</div>
	)
} 