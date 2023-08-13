import { CircleCheck } from './Icons'
import { ProgressBar } from './ProgressBar'
import { Modal } from './Modal'
import { useState } from 'react'

export const Item = ({task,setTasks,tasks}) =>{
	const [showModal,setShowModal] = useState(false)
	return(
		<li className="item">
			<div className='info-container'>
				<CircleCheck />
				<p className="task-title">{task.title}</p>
				<ProgressBar />
			</div>

			<div className='button-container'>
				<button className='edit' onClick={()=>setShowModal(true)}>EDIT</button>
				<button className='delete'>DELETE</button>

			</div>
			{
				showModal && <Modal mode={'edit'} setShowModal={setShowModal} task={task} setTasks={setTasks} tasks={tasks}/>
			}
		</li>
	)
}