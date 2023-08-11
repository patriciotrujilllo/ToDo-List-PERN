import { Modal } from './Modal'
import {NoteIcon} from './Icons'

export const Header = ({listname}) =>{

	const create = () =>{
		console.log('create')
	}
	const signout = () =>{
		console.log('signout')
	}
	return(
		<header className="list-header">
			<h1><NoteIcon/> {listname}</h1>
			<div className="button-container">
				<button className="create" onClick={create}>ADD NEW</button>
				<button className="signout" onClick={signout}>SIGN OUT</button>
			</div>
			<Modal />
		</header>
	)
}