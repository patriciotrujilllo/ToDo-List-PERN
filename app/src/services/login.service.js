export const loginUser = (data) =>{
	// eslint-disable-next-line no-undef
	return fetch('http://localhost:4000/login',{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}