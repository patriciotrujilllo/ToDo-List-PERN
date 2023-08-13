import { Item } from './Item'

export const ListItem = ({ setTasks,tasks }) => {
	//Orsenar por fecha
	const sortedTasks = tasks.sort((a,b) => new Date(a.date) - new Date(b.date))

	return (
		<ul className='list-item'>
			{
				sortedTasks?
					sortedTasks.map((sortedTasks) => (
						<Item key={sortedTasks.id} task={sortedTasks} setTasks={setTasks} tasks={tasks}/>
					)):<span>...loading</span>
			}
		</ul>
	)
}