import { Modal } from './Modal'
import {NoteIcon} from './Icons'
import { useState } from 'react'

export const Header = ({listname,setTasks,tasks}) =>{
	const [showModal,setShowModal] = useState(false)
	const signout = () =>{
		console.log('signout')
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