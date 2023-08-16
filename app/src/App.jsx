import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ListItem } from './components/ListItem'
import {Auth} from './components/Auth'
import { useCookies } from 'react-cookie'

function App() {
	const [tasks,setTasks] = useState([])
	const [cookies] = useCookies(null)
	const [loading,setLoading] = useState(false)
	const authToken = cookies && cookies.user && cookies.user.token ? cookies.user.token : null

	const email = cookies && cookies.user && cookies.user.email ? cookies.user.email : null


	const Data = async() =>{
		setLoading(true)
		try{
			// eslint-disable-next-line no-undef
			const response = await fetch(`${process.env.REACT_APP_URL}/todos/${email}`)
			const json = await response.json()
			setTasks(json)
		}catch (err){
			console.error(err)
		}finally{
			setLoading(false)
		}
	}

	useEffect(()=>{
		
		if(authToken){
			Data()
		} 
		
	},[],loading)

	return(
		<main className='app'>
			{authToken?
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
