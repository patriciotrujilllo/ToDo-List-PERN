import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ListItem } from './components/ListItem'
import {Auth} from './components/Auth'
import { useCookies } from 'react-cookie'
import { getTodo,setToken } from './services/todo.services'

function App() {
	const [tasks,setTasks] = useState(null)
	const [cookies] = useCookies(null)
	const [loading,setLoading] = useState(false)
	const authToken = cookies && cookies.user && cookies.user.token ? cookies.user.token : null

	const email = cookies && cookies.user && cookies.user.email ? cookies.user.email : null

	const Data = async() =>{
		setLoading(true)
		try{
			setToken(authToken)
			const response = await getTodo(email)
			setTasks(response)
		}catch (err){
			console.error(err,'en el app')
		}finally{
			setLoading(false)
		}
	}

	useEffect(()=>{
		
		if(authToken){
			Data()
		} 
		
	},[authToken])
	return(
		<main className='app'>
			{tasks && authToken?
				<>
					<Header listname={'To Do List'} setTasks={setTasks} tasks={tasks}/>
			
					{loading?<span>...loading</span>:<ListItem setTasks={setTasks} tasks={tasks}/>}
				</>
				:<Auth />
			}
		</main>
	)

}

export default App
