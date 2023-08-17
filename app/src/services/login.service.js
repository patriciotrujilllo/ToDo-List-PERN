export const loginUser = (data) =>{
	return fetch(`${process.env.REACT_APP_URL}/login`,{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}