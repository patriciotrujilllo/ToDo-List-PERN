import { CircleCheck } from './Icons'
import { ProgressBar } from './ProgressBar'

export const Item = ({task}) =>{
	return(
		<li className="item">
			<div className='info-container'>
				<CircleCheck />
				<p className="task-title">{task.title}</p>
				<ProgressBar />
			</div>

			<div className='button-container'>
				<button className='edit'>EDIT</button>
				<button className='delete'>DELETE</button>

			</div>
		</li>
	)
}