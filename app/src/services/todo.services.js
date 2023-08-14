// import axios from 'axios'
const url ='http://localhost:4000/todos'

export const getTodo = async() =>{
	
}
export const createTodo = (data) => {
	return fetch(url,{
		method: 'POST',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const editTodo = (data,id) =>{
	return fetch(`${url}/${id}`,{
		method: 'PATCH',
		headers: {'Content-Type':'application/json'},
		body: JSON.stringify(data)
	}).then(res=>res.json())
}

export const deleteTodo = (id) =>{
	return fetch(`${url}/${id}`,{
		method:'DELETE',
		headers:{'Content-Type':'application/json'}
	}).then(res=>res.json()).catch(err=>console.error(err))
}