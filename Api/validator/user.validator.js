import z from 'zod'

const todoShema = z.object({
	email: z.string({
		required_error: 'task user_email is required'
	}),
	password: z.string({
		required_error: 'task password is required'
	}),
    confirm: z.string({
        required_error: 'task confirm password required'
    })
    .refine((data)=>data.password === data.confirm,{
        message: 'Password do not match',
        path: ['confirm_password']
    })
})

export const validate = (object) =>{
	return todoShema.safeParse(object)
}
