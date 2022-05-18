import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from './../components/Icons';
import TextField from './../components/TextField';
import Layout from './../components/Layout';

import { signUp } from './../services/auth.service';

import { Formik, Form } from 'formik';
import { validateSignup } from './../components/validation.form';

function Signup() {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState(''); // State on what error message to show

	const handleSignup = async (values) => {
		const { firstname, lastname, 
				username, email, password } = values;

		const data = { firstname, lastname, username, email, password };

		await signUp(data).then(res => { 
			 	if(res.data.success === false) {
			 		setErrorMessage(res.data.message);
			 		const errorMessageDoc = document.getElementById("errorMessage");
			 		errorMessageDoc.classList.remove('hidden');

			 		errorMessageDoc.classList.add('animate-bounce');

			 		setTimeout(() => {
			 			errorMessageDoc.classList.remove('animate-bounce');
			 		}, 250);
			 	}
			 	else window.location.replace('/signin');

			  }).catch(error => console.log(error));
	}

	useEffect(() => {
		if(localStorage.getItem('token')) window.location.replace('/');
	}, []);

	return (
		<Layout>
			<div id="errorMessage" className="hidden animate-pulse shadow bg-gray-300 py-1 text-gray-900 font-normal tracking-widest absolute px-2 right-0 top-2">
				<p className="text-center text-xs">{ errorMessage }</p>
			</div>

			<div className="p-8 sm:px-16">
				<button onClick={ () => navigate('/') } className="absolute top-2 text-gray-600 hover:scale-110 duration-300 transition-all left-4">
					<ArrowLeft className="h-6 w-6"/>
				</button>

				<h1 className="text-5xl mt-4 mb-12 text-center sm:text-6xl tracking-tighter font-thin uppercase"><span className="font-normal">Note</span>rnal</h1>

				<span className="text-gray-800 font-normal tracking-wider">Sign up now</span>

				<Formik 
					initialValues = {{ firstname: '',lastname: '',
									   username: '', email: '',
									   password: '', confirmPassword: '' }}	
					validationSchema = { validateSignup } 
					onSubmit={handleSignup} >
					{ formik => (
						<Form className="mt-6">
							<div className="grid grid-cols-2 gap-2">
								<TextField name="firstname" type="text" placeholder="Firstname"/>
								<TextField name="lastname" type="text" placeholder="Lastname"/>
							</div>

							<TextField name="username" type="text" placeholder="Username"/>
							<TextField name="email" type="email" placeholder="Email"/>

							<TextField name="password" type="password" placeholder="Password"/>
							<TextField name="confirmPassword" type="password" placeholder="Confirm Password"/>

							<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Sign up</button>
							
							<div className="text-center mt-2">
								<button onClick={() => navigate('/signin')} className="text-xs text-gray-600 hover:text-gray-700 transition-all tracking-wide">Already have an account?</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Layout>
	)
}

export default Signup