import { useState } from 'react'
import { createTodo,editTodo } from '../services/todo.services.js'

export const Modal = ({mode,setShowModal,setTasks,tasks,task}) =>{

	const [data,setData] = useState({
		user_email: mode==='edit' ? task.user_email: 'pato3@gmail.com',
		title: mode==='edit' ? task.title: '',
		progress: mode==='edit' ? task.progress: 0
	})

	const handleChangeTitle = (e) =>{
		const title = e.target.value
		setData(prevData => ({
			...prevData,
			title: title
		}))
	}
	const handleChangeRange = (e) =>{
		const progress = e.target.value
		setData(prevData => ({
			...prevData,
			progress: parseInt(progress)
		}))
	}
	const handleSubmitCreate = async(e,tasks) =>{
		e.preventDefault()
		const newtodo = await createTodo(data)
		
		setTasks([...tasks, newtodo])
		setShowModal(false)
	}
	const handleSubmitEdit = async(e,task) =>{
		e.preventDefault()
		const updateTask =  await editTodo(data,task.id)
		const idtask = tasks.findIndex(t=>t.id===task.id)
		const newTaskDom = structuredClone(tasks)
		newTaskDom[idtask]={
			...newTaskDom[idtask],
			...updateTask
		}
		setTasks(newTaskDom)
		setShowModal(false)
	}
	return(
		<div className="overlay">
			<div className="modal">
				<div className="form-title">
					<h3>Lets {mode} your task</h3>
					<button onClick={()=>setShowModal(false)}>X</button>
				</div>

				<form onSubmit={mode==='edit'?(e)=>handleSubmitEdit(e,task):(e)=>handleSubmitCreate(e,tasks)}>
					<input 
						required
						maxLength={30}
						placeholder="add your task"
						name="title"
						value={data.title}
						onChange={handleChangeTitle}
					/>
					<label id='range' >Select yor current progress</label>
					<input 
						required
						type="range"
						id='range'
						min={0}
						max={100}
						value={data.progress}
						onChange={handleChangeRange}
					/>
					<button className={mode}>{mode}</button>
				</form>
			</div>
		</div>
	)
}