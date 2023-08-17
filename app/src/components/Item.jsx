import { CircleCheck } from './Icons'
import { ProgressBar } from './ProgressBar'
import { Modal } from './Modal'
import {deleteTodo} from '../services/todo.services'
import { useState } from 'react'

export const Item = ({task,setTasks,tasks}) =>{
	const [showModal,setShowModal] = useState(false)

	const deleteTaks = async(e,task) =>{
		e.preventDefault()
		try{
			const filter = tasks.filter(t=>t.id!==task.id)
			setTasks([...filter])
			await deleteTodo(task.id)
			
		}catch(err) {
			console.error(err)
		}
	}
	return(
		<li className="item">
			<div className='info-container'>
				<CircleCheck />
				<p className="task-title">{task.title}</p>
				<ProgressBar />
			</div>

			<div className='button-container'>
				<button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
				<button className='delete' onClick={(e)=>deleteTaks(e,task)}>DELETE</button>

			</div>
			{
				showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} setTasks={setTasks} tasks={tasks}/>
			}
		</li>
	)
}