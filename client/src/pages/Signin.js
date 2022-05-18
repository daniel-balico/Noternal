import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from './../components/Icons';
import Layout from './../components/Layout';

import { signIn } from './../services/auth.service';

import { Formik, Form } from 'formik';
import TextField from './../components/TextField';
import { validateSignin } from './../components/validation.form';

function Signin() {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState('');

	const handleSignin = async (values) => {

		const { username, password } = values;

		const data = { username: username, password: password };

		await signIn(data)
			 .then(res => {
			 	if(res.data.success) {
					localStorage.setItem('token', res.data.token);
					window.location.replace('/');
			 	}
			 	else {
			 		setErrorMessage(res.data.message);
			 		const errorMessageDoc = document.getElementById("errorMessage");
			 		errorMessageDoc.classList.remove('hidden');
			 		errorMessageDoc.classList.add('animate-bounce');

			 		setTimeout(() => {
			 			errorMessageDoc.classList.remove('animate-bounce');
			 		}, 250);
			 	}
			 	
			 }).catch(err => console.log(err) );
	}

	useEffect(() => {
		if(localStorage.getItem('token')) window.location.replace('/');
	}, []);

	return (
		<Layout>
			<div id="errorMessage" className="hidden animate-pulse shadow bg-red-300 py-1 text-gray-900 font-normal tracking-widest absolute px-2 right-0 top-2">
				<p className="text-center text-xs">{errorMessage}</p>
			</div>

			<div className="p-8 sm:px-16">
				<button onClick={ () => navigate('/') } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
					<ArrowLeft className="h-6 w-6"/>
				</button>

				<h1 className="text-5xl mt-4 mb-12 text-center sm:text-6xl tracking-tighter font-thin uppercase"><span className="font-normal">Note</span>rnal</h1>

				<span className="text-gray-800 font-normal">Please sign in to your account</span>

				<Formik 
					initialValues = {{ username: '', password: ''}}	
					validationSchema = { validateSignin } 
					onSubmit={(values) => handleSignin(values) }>
					{ formik => (
						<Form className="mt-4">
							<TextField name="username" type="text" placeholder="Username"/>
							<TextField name="password" type="password" placeholder="Password"/>

							<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Sign in</button>
							
							<div className="text-center mt-2">
								<button onClick={() => navigate('/forgot-password')} className="text-xs text-gray-600 hover:text-gray-700 transition-all tracking-wide">Forgot password?</button>
							</div>

							<button className="text-xs mt-8 text-gray-600 hover:text-gray-700 transition-all tracking-wide" onClick={() => navigate('/signup')}>Don't have an account?</button>
						</Form>
					)}
				</Formik>
			</div>
		</Layout>
	)
}

export default Signin