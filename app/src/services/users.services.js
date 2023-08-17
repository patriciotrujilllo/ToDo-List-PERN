export const createUser = (data) =>{
	
	return fetch(`${process.env.REACT_APP_URL}/users`,{
		method:'POST',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify(data)
	}).then(res => {
		if (!res.ok) {
			return res.json().then(error => {
				throw new Error(error.message)
			})
		}
		return res.json()
	})
}