import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {  ArrowLeft } from './../components/Icons';
import Layout from './../components/Layout';

import { getUser, isAuthenticated, checkPassword, changePassword } from './../services/auth.service';

import { Formik, Form } from 'formik';
import TextField from './../components/TextField';
import { validateChangePassword } from './../components/validation.form';

function Profile() {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState('');

	const [userDetails, setUserDetails] = useState({}); // State where all the queried user details are stored.
	const [changePasswordPhase, setChangePasswordPhase] = useState(false);
	const [chSuccess, setCHSuccess] = useState(false);

	useEffect(() => {
		isAuthenticated().then(authResponse => { // API call to check whether the user is authenticated.
			if(authResponse.data.isLoggedIn === false) window.location.replace('/signin'); // If not authenticated, redirect to signin page

			/* 
				API call to get the current user's details.
				The isAuthenticated API call returns a response that includes the current user's account id,
				therefore is used to get the account information.
			*/
			getUser('id', authResponse.data.id)
		    .then(getUserResponse => {
			  	const {id, firstname, lastname, username, email} = getUserResponse.data;
			  	let tempUserDetails = { id, firstname, lastname, username, email }; 

			  	setUserDetails(tempUserDetails);
		    })
		})
	}, []);

	const showErrorMessage = (message) => {
		setErrorMessage(message)

		const errorMessageDoc = document.getElementById("errorMessage");
 		errorMessageDoc.classList.remove('hidden');
 		errorMessageDoc.classList.add('animate-bounce');

 		setTimeout(() => {
 			errorMessageDoc.classList.remove('animate-bounce');
 		}, 250);
	}

	const handleChangePassword = (values) => {
		const { currentPassword, password } = values;

		checkPassword({ currentPassword })
		.then(res => {
			if (res.data.correct) {
				const data = { id: userDetails.id,
							   password: password,
							   key: process.env.REACT_APP_CH_PSS_KEY, }

				changePassword(data)
				.then(() => { setCHSuccess(true) })
				.catch(err => showErrorMessage(err.message))
			}
			else {
				showErrorMessage("Current password is incorrect.");
			}
		})
	}

	return (
		<Layout>
			<div id="errorMessage" className="hidden animate-pulse shadow bg-red-300 py-1 text-gray-900 font-normal tracking-widest absolute px-2 right-0 top-2">
				<p className="text-center text-xs">{errorMessage}</p>
			</div>

			<div className="p-8 sm:px-16">	
				{
					chSuccess ? (
						<>  <button onClick={ () => {setChangePasswordPhase(false); setCHSuccess(false); } } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
								<ArrowLeft className="h-6 w-6"/>
							</button>

							<p className="text-xl tracking-widest uppercase">change password</p>
							<span className="text-6xl font-normal uppercase">success</span>
						</>
					): (
						changePasswordPhase ? (
							<>	
								<button onClick={ () => {setChangePasswordPhase(false); } } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
									<ArrowLeft className="h-6 w-6"/>
								</button>

								<p className="text-xl tracking-widest uppercase">change your</p>
								<span className="text-6xl font-normal uppercase">password</span>

								<Formik 
									initialValues = {{currentPassword: '', password: '', confirmPassword: ''}}	
									validationSchema = { validateChangePassword } 
									onSubmit={ handleChangePassword }>
									{ formik => (
										<Form className="mt-4">
											<TextField name="currentPassword" type="password" placeholder="Current Password"/>
											<TextField name="password" type="password" placeholder="Password"/>
											<TextField name="confirmPassword" type="password" placeholder="Confirm Password"/>
										
											<button type="submit" className="bg-gray-900 mt-2 rounded hover:bg-gray-800 w-full transition-all py-2 text-white tracking-wider">Submit</button>
										</Form>
									)}
								</Formik> 
							</>
						):
						(
							<>
								<button onClick={ () => { navigate('/') } } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
									<ArrowLeft className="h-6 w-6"/>
								</button>

								<p className="text-xs font-thin">{ userDetails.id }</p>
								<h1 className="text-5xl uppercase">{ userDetails.firstname } <span className="font-normal">{userDetails.lastname}</span></h1>
								
								<p className="text-xl tracking-widest font-light">{ userDetails.email }</p>
								
								<button onClick={() => setChangePasswordPhase(true)} className="mt-8 text-blue-500 hover:underline">Change Password?</button>
							</>
						)
					)
				}
			</div>
		</Layout>
	)
}

export default Profile