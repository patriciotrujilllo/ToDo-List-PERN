import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ListItem } from './components/ListItem'
import {Auth} from './components/Auth'

function App() {
	const [tasks,setTasks] = useState([])
	const authToken = false

	const Data = async() =>{
		try{
			const response = await fetch('http://localhost:4000/todos/pato3@gmail.com')
			const json = await response.json()
			setTasks(json)
		}catch (err){
			console.error(err)
		}
	}

	useEffect(()=>{
		if(authToken){
			Data()
		} 
	},[])

	return(
		<main className='app'>
			{authToken?
				<>
					<Header listname={'To Do List'} setTasks={setTasks} tasks={tasks}/>
			
					{tasks?<ListItem setTasks={setTasks} tasks={tasks}/>:<span>...loading</span>}
				</>
				:<Auth />
			}
		</main>
	)

}

export default App
