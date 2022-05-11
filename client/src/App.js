import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import Main from './pages/Main';
import Profile from './pages/Profile';

function App() {
  return (
	<BrowserRouter>
		<Routes>
			{ <Route path="/" element={ 
					 localStorage.getItem('token') ? (<Main />)
												   : (<Landing />) } exact /> }
			<Route path="/profile" element={<Profile />} exact/>
			<Route path="/signin" element={<Signin />} exact/>
			<Route path="/signup" element={<Signup />} exact/>
			<Route path="/verification" element={<Verification />} exact/>
			<Route path="/forgot-password" element={<ForgotPassword />} exact/>
		</Routes>
	</BrowserRouter>
  );
}

export default App;
