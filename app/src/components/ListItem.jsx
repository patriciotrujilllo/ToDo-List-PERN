import { Item } from './Item'

export const ListItem = ({ setTasks,tasks }) => {
	//Orsenar por fecha
	// const task = tasks.sort((a,b) => new Date(a.date) - new Date(b.date))
	return (
		<ul className='list-item'>
			{
				tasks?
					tasks.map((task) => (
						<Item key={task.id} task={task} setTasks={setTasks} tasks={tasks}/>
					)):<span>...loading</span>
			}
		</ul>
	)
}