import { useState } from 'react'

export const Auth = () =>{
	const [login,setlogin] = useState(true)

	const handleSubmit = (e) =>{
		e.preventDefault()
		console.log(e.target.value)
	}

	return(
		<div className="auth-container">
			<div className='auth-container-box'>
				<h2>{login?'Please log in':'Please sign up'}</h2>
				<form className="input-container" onSubmit={(e)=>handleSubmit(e)}>
					<input placeholder='email' type="text" />
					<input placeholder='password' type="password" />
					{!login?<input type='password' placeholder="confirm password"/>:''}
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