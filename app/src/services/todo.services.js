let token=null
export const setToken = (authToken) =>{
	token = `Bearer ${authToken}`
}

export const getTodo = async(email) =>{
	return fetch(`${process.env.REACT_APP_URL}/todos/${email}`,{
		headers:{
			authorization: token
		}
	}).then(res=>res.json()).catch(err=>console.error(err))
}
export const createTodo = (data) => {
	return fetch(`${process.env.REACT_APP_URL}/todos`,{
		method: 'POST',
		headers: {
			'Content-Type':'application/json',
			authorization: token
		},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const editTodo = (data,id) =>{
	return fetch(`${process.env.REACT_APP_URL}/todos/${id}`,{
		method: 'PATCH',
		headers: {
			'Content-Type':'application/json',
			authorization: token
		},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const deleteTodo = (id) =>{
	return fetch(`${process.env.REACT_APP_URL}/todos/${id}`,{
		method:'DELETE',
		headers:{
			'Content-Type':'application/json',
			authorization: token
		}
	}).then(res=>res.json()).catch(err=>console.error(err))
}