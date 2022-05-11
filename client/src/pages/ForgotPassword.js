import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Layout from './../components/Layout';
import { ArrowLeft } from './../components/Icons';

import { Formik, Form } from 'formik';
import TextField from './../components/TextField';
import { validateUsername, validateEmail, validateChangePassword, validateCode } from './../components/validation.form';

import { getUser, changePassword } from './../services/auth.service';
import { sendCode, encrypt, compare } from './../services/utility.service';

import bcryptjs from 'bcryptjs';

function ForgotPassword() {
	const navigate = useNavigate();

	const [userQuery, setUserQuery] = useState(null); 					   // A state where the user details are stored after the input of username.
	const [codePhase, setCodePhase] = useState(false); 					   // A state that changes the UI for entering a code that is sent to the user's email.
	const [changePasswordPhase, setChangePasswordPhase] = useState(false); // A state that changes the UI to let the user change the password of the account.
	const [chPassSucessNotice, setCHPassSuccessNotice] = useState(false)   // A state that changes the UI if the user successfully changed the password,

	const [errorMessage, setErrorMessage] = useState('');				   // A state on what error message to show
	const [encryptedCode, setEncryptedCode] = useState(0);				   // A state where the code encrypted by bcrypt is stored after the 2nd phase.

	useEffect(() => {
		if(localStorage.getItem('token')) window.location.replace('/');	   // If already logged in, redirect to the main page.
	}, [])

	// Show an error message.
	const showErrorMessage = (message) => {
		setErrorMessage(message);
 		const errorMessageDoc = document.getElementById("errorMessage");
 		errorMessageDoc.classList.remove('hidden');
	}

	// Hide an error message.
	const hideErrorMessage = () => {
		setErrorMessage('');
 		const errorMessageDoc = document.getElementById("errorMessage");
 		errorMessageDoc.classList.add('hidden');
	}

	// Phase 1
	const handleSubmitUsername = (value, { resetForm }) => {
		// API call to get the user information of the entered username,.
		getUser('username', value.username)
		.then  (res => {
			if (res.data.success) setUserQuery(res.data); // Set the acquired data to the userQuery state
			else showErrorMessage(res.data.message);	  // Show an error message

		}).catch (err => showErrorMessage(err));

		resetForm({}); 
		hideErrorMessage();
	}

	// Phase 2
	const handleSubmitEmail = (value, { resetForm }) => {
		// Check if the email input matches the email in the acquired user info
		if (value.email === userQuery.email) {
			const code = Math.floor(Math.random() * 9999) + 1000;

			const data = { firstname: userQuery.firstname,
						   email: userQuery.email,
						   code: code }

			sendCode(data); // Email the code

			// Encrypt the code and store to state
			encrypt({input: code})
			.then(res => {
				setEncryptedCode(res.data.result);
			})

			setCodePhase(true);			
		}
		else showErrorMessage("Email does not match.");

		resetForm({});
		hideErrorMessage(); 
	}

	// Phase 3
	const handleSubmitCode = (value) => {
		compare({x: String(value.code), y:encryptedCode})
		.then(res => {
			if(res.data.match) setChangePasswordPhase(true);
			else 			   setErrorMessage('Invalid Code.')
		})

		hideErrorMessage();
	}

	// Phase 4
	const handleChangePassword = (values) => {
		const data = { id: userQuery.id,
					   password: values.password,
					   key: process.env.REACT_APP_CH_PSS_KEY, }

		// Change the password
		changePassword(data)
		.then(res => setCHPassSuccessNotice(true))

		hideErrorMessage();
	}

	return (
		<Layout>
			<div id="errorMessage" className="hidden animate-pulse shadow bg-gray-300 py-1 text-gray-900 font-normal tracking-widest absolute px-2 right-0 top-2">
				<p className="text-center text-xs">{ errorMessage }</p>
			</div>

			<div className="p-8 sm:px-16">
				{
					chPassSucessNotice ? (
						<>
							<p className="text-xl tracking-widest uppercase">change password</p>
							<span className="text-6xl font-normal uppercase">success</span>

							<p className="mt-2">You've successfully changed the password of <span className="font-normal">{ userQuery.username }</span>. Please click the button below to continue.</p>

							<button onClick={() => navigate('/signin')} className="border py-2 text-lg sm:text-xl border-gray-900 bg-gray-900 text-white  hover:border-gray-700 hover:bg-gray-700 transition-all duration-300 w-full mt-4">Click here to go back to sign in</button>
						</>
					): (
						<>
							<p className="text-xl tracking-widest uppercase">Reset your</p>
							<span className="text-6xl font-normal uppercase">password</span>
							
							{/* UI changes base on what state is true */}
							{
								changePasswordPhase ? ( // Final Phase where the user can now change the account's password
									<> <p className="mt-2">
											You can now change your password.
										</p>

										<Formik 
											key={3}
											initialValues = {{ password: '', confirmPassword: ''}}	
											validationSchema = { validateChangePassword } 
											onSubmit={ handleChangePassword }>
											{ formik => (
												<Form className="mt-4">
													<TextField name="password" type="password" placeholder="Password"/>
													<TextField name="confirmPassword" type="password" placeholder="Confirm Password"/>
												
													<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Submit</button>
												</Form>
											)}
										</Formik> </>
								): (
									codePhase ? ( // 3rd Phase where the user should enter the code that is sent to the account's email
										<> <p className="mt-2">
												Please enter the code that is sent to <span className="font-normal">{ userQuery.email }</span>
											</p>

											<Formik 
											key={2}
												initialValues = {{ code: ''}}	
												validationSchema = { validateCode } 
												onSubmit={ handleSubmitCode }>
												{ formik => (
													<Form className="mt-4">
														<TextField name="code" type="text" placeholder="12345"/>
													
														<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Submit</button>
													</Form>
												)}
											</Formik> </>
									): (
										userQuery ? ( // 2nd Phase where the user should identify the account's email
											<> <p className="mt-2"> Please identify this email to continue{' '}
													<span className="font-normal">{ (userQuery.email).replace(/^.{5}/g, '*****') }</span>
												</p>

												<Formik 
													key={1}
													initialValues = {{ email: ''}}	
													validationSchema = { validateEmail } 
													onSubmit={ handleSubmitEmail }>
													{ formik => (
														<Form className="mt-4">
															<TextField name="email" type="email" placeholder="Email"/>
														
															<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Submit</button>
														</Form>
													)}
												</Formik> </>
										): ( // 1st Phase: where the user should enter the username of the account he want's to change the password
											<> 
												<button onClick={ () => navigate('/') } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
													<ArrowLeft className="h-6 w-6"/>
												</button>
												
												<p className="mt-2">Please enter the username of the account you want to reset the password.</p>

												<Formik 
													key={0}
													initialValues = {{ username: ''}}	
													validationSchema = { validateUsername } 
													onSubmit={ handleSubmitUsername }>
													{ formik => (
														<Form className="mt-4">
															<TextField name="username" type="text" placeholder="Username"/>
														
															<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Submit</button>
														</Form>
													)}
												</Formik> 
											</>
										)
									)
								)
							}
						</>

					)
				}
				
	
			</div>
		</Layout>
	)
}

export default ForgotPassword