import * as Yup from 'yup';

// Signup Page
export const validateSignup = Yup.object({
	firstname: Yup.string()
				  .max(15, 'Must be 15 characters or less')
				  .required('Firstname required*'),
	
	lastname: Yup.string()
				 .max(15, 'Must be 15 characters or less')
				 .required('Lastname required*'),

	username: Yup.string()
				 .max(15, 'Must be 15 characters or less')
				 .required('Username required*'),

	email: Yup.string()
			  .email('Invalid email')
			  .required('Email Required*'),

	password: Yup.string()
				 .min(8, 'Must at least 8 characters long')
				 .required('Password required*'),

	confirmPassword: Yup.string()
					    .oneOf([Yup.ref('password'), null], "Password doesn't match")
					    .required('Confirmation required*'),
})

// Sign in Page
export const validateSignin = Yup.object({
	username: Yup.string()
				 .required('Username required*'),
				 
	password: Yup.string()
				 .required('Password required*'),
})

// Main Page
export const validateAddNote = Yup.object({
	title: Yup.string()
				 .required('Title required*'),
				 
	note: Yup.string()
				 .required('Note required*'),

	color: Yup.string()
				 .required('Color required*'),
})

// Verification Page & Forgot Password Page
export const validateCode = Yup.object({
	code: Yup.number()
			 .required('Please enter the code*')
})

// Forgot Password Page
export const validateUsername = Yup.object({
	username: Yup.string()
				 .max(15, 'Must be 15 characters or less')
				 .required('Username required*'),
})

export const validateEmail = Yup.object({
	email: Yup.string()
			  .email('Invalid email*')
			  .required('Email Required*'),
})

export const validateChangePassword = Yup.object({
	password: Yup.string()
				 .min(8, 'Must at least 8 characters long')
				 .required('Password required*'),

	confirmPassword: Yup.string()
					    .oneOf([Yup.ref('password'), null], "Password doesn't match")
					    .required('Confirmation required*'),
})