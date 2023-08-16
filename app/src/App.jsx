import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ListItem } from './components/ListItem'
import {Auth} from './components/Auth'
import { useCookies } from 'react-cookie'

function App() {
	const [tasks,setTasks] = useState([])
	const [cookies] = useCookies(null)
	const authToken = cookies && cookies.user && cookies.user.token ? cookies.user.token : null

	const email = cookies && cookies.user && cookies.user.email ? cookies.user.email : null


	const Data = async() =>{
		try{
			// eslint-disable-next-line no-undef
			const response = await fetch(`${process.env.REACT_APP_URL}/todos/${email}`)
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
