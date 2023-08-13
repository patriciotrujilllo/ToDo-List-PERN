import z from 'zod'

const todoShema = z.object({
	user_email: z.string({
		invalid_type_error: 'todo email must be a string',
		required_error: 'todo user_email is required'
	}),
	title: z.string({
		invalid_type_error: 'todo title must be a string',
		required_error: 'todo title is required'
	}),
	progress: z.number().int().min(0).max(100).default(0)
})

export const validate = (object) =>{
	return todoShema.safeParse(object)
}

export const validatePartial = (object) =>{
	return todoShema.partial().safeParse(object)
}