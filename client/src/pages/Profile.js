import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {  ArrowLeft } from './../components/Icons';
import Layout from './../components/Layout';

import { getUser, isAuthenticated } from './../services/auth.service';


function Profile() {
	const navigate = useNavigate();

	const [userDetails, setUserDetails] = useState({}); // State where all the queried user details are stored.

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

	return (
		<Layout>
			<div className="p-8 sm:px-16">
				<button onClick={ () => navigate('/') } className="absolute top-2 text-gray-900 hover:scale-110 duration-300 transition-all left-4">
					<ArrowLeft className="h-6 w-6"/>
				</button>

				<p className="text-xs font-light">{ userDetails.id }</p>
				<h1 className="text-5xl uppercase">{ userDetails.firstname } <span className="font-normal">{userDetails.lastname}</span></h1>
				
				<p className="text-xl tracking-widest font-light">{ userDetails.email }</p>
				
				<button className="mt-8 text-blue-500 hover:underline">Change Password?</button>
			</div>
		</Layout>
	)
}

export default Profile