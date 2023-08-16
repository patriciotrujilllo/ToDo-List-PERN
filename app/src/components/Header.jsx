import { Modal } from './Modal'
import {NoteIcon} from './Icons'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

export const Header = ({listname,setTasks,tasks}) =>{
	const [showModal,setShowModal] = useState(false)
	const [,,removeCookie] = useCookies(null)
	const signout = () =>{
		console.log('signout')
		removeCookie('user')
	}
	return(
		<header className="list-header">
			<h1><NoteIcon/> {listname}</h1>
			<div className="button-container">
				<button className="create" onClick={()=>setShowModal(true)}>ADD NEW</button>
				<button className="signout" onClick={signout}>SIGN OUT</button>
			</div>
			{
				showModal && <Modal mode={'create'} setShowModal={setShowModal} setTasks={setTasks} tasks={tasks}/>
			}
			
		</header>
	)
}