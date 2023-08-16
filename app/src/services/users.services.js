const url ='http://localhost:4000/users'

export const createUser = (data) =>{
	return fetch(url,{
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