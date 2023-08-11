export const Modal = () =>{
	
	const mode = 'edit'

	const handleChange = () =>{

	}
	const handleChangeRange = () =>{

	}
	return(
		<div className="overlay">
			<div className="modal">
				<div className="form-title">
					<h3>Lets {mode} your task</h3>
					<button>X</button>
				</div>

				<form>
					<input 
						required
						maxLength={30}
						placeholder="add your task"
						name="title"
						onChange={handleChange}
					/>
					<input 
						required
						type="range"
						min="0"
						max="100"
						onChange={handleChangeRange}
					/>
					<button className={mode}>{mode}</button>
				</form>
			</div>
		</div>
	)
}