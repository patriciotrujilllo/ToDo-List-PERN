import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ListItem } from './components/ListItem'

function App() {
	const [tasks,setTasks] = useState([])

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
		Data()
	},[])

	return(
		<main className='app'>
			<Header listname={'To Do List'}/>
			{
				tasks?<ListItem tasks={tasks}/>:<span>...loading</span>
			}
			
		</main>
	)

}

export default App
