import React, { useState, useEffect } from 'react';

import Layout from './../components/Layout';

import { verifyAccount, getUser, isAuthenticated } from './../services/auth.service';

import { Formik, Form } from 'formik';
import TextField from './../components/TextField';
import { validateCode } from './../components/validation.form';

function Verification() {
	const [email, setEmail] = useState(''); 			  // State where isAuthenticated API call stores the user's email to show in the UI
	const [errorMessage, setErrorMessage] = useState(''); // State on what error message to show
	
	useEffect(() => {
		isAuthenticated().then(authResponse => { // API call to check whether the user is authenticated.
			// Check if authenticated, if yes take the email
			if 	 (authResponse.data.isLoggedIn) setEmail(authResponse.data.email);
			else window.location.replace('/signin');

			/* 
				API call to get the current user's details.
				The isAuthenticated API call returns a response that includes the current user's account id,
				therefore is used to get the account information.
			*/
			getUser('id', authResponse.data.id)
		    .then(getUserResponse => {
			  	if(getUserResponse.data.verified) window.location.replace('/');
		    })
		})
	})

	const handleSubmit = (values) => {
		// API call to verify the account with the given code
		verifyAccount({ code: values.code }).then(res => {
			if (res.data.success) window.location.replace('/'); // If code is right, proceed to the main page

			else { // If wrong, show an error message.
				setErrorMessage(res.data.message);
		 		const errorMessageDoc = document.getElementById("errorMessage");
		 		errorMessageDoc.classList.remove('hidden');

		 		errorMessageDoc.classList.add('animate-bounce');

		 		  
			}
		})
	}

	return (
		<Layout>
			<div id="errorMessage" className="hidden animate-pulse shadow bg-gray-300 py-1 text-gray-900 font-normal tracking-widest absolute px-2 right-0 top-2">
				<p className="text-center text-xs">{ errorMessage }</p>
			</div>

			<div className="p-8 sm:px-16">
				<p className="text-xl tracking-widest uppercase">Verify your</p>
				<span className="text-7xl font-normal uppercase">Email</span>

				<p className="mt-2 font-light">We've sent an email to <span className="font-normal">{ email }</span> to verify your email addresss and activate your account.</p>
				
				<Formik 
					initialValues = {{ code: ''}}	
					validationSchema = { validateCode } 
					onSubmit={(values) => handleSubmit(values) }>
					{ formik => (
						<Form className="mt-4">
							<TextField name="code" type="number" placeholder="Enter code here"/>
						
							<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Verify</button>
						</Form>
					)}
				</Formik>
			</div>
		</Layout>
	)
}

export default Verification