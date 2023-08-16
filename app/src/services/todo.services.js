// import axios from 'axios'
const url ='http://localhost:4000/todos'

let token=null
export const setToken = (authToken) =>{
	token = `Bearer ${authToken}`
}

export const getTodo = async(email) =>{
	// eslint-disable-next-line no-undef
	return fetch(`${url}/${email}`,{
		headers:{
			authorization: token
		}
	}).then(res=>res.json()).catch(err=>console.error(err))
}
export const createTodo = (data) => {
	return fetch(url,{
		method: 'POST',
		headers: {
			'Content-Type':'application/json',
			authorization: token
		},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const editTodo = (data,id) =>{
	return fetch(`${url}/${id}`,{
		method: 'PATCH',
		headers: {
			'Content-Type':'application/json',
			authorization: token
		},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const deleteTodo = (id) =>{
	return fetch(`${url}/${id}`,{
		method:'DELETE',
		headers:{
			'Content-Type':'application/json',
			authorization: token
		}
	}).then(res=>res.json()).catch(err=>console.error(err))
}