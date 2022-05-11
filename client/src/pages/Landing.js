import React from 'react'
import { useNavigate } from 'react-router-dom';

function Landing() {
	const navigate = useNavigate();

	return (
		<div className="h-screen flex flex-wrap justify-center content-center">
			<div>
				<h1 className="text-6xl sm:text-7xl tracking-tighter font-thin uppercase"><span className="font-normal">Note</span>rnal</h1>

				<p className="text-center text-lg sm:text-xl mt-1 font-light">Online note-taking application</p>
			
				<div className="mt-8 grid grid-cols-2">
					<button onClick={() => navigate('/signin') } className="border py-2 text-lg sm:text-xl border-gray-900 text-gray-900 hover:border-gray-700 hover:text-gray-700 transition-all duration-300">Sign in</button>
					<button onClick={() => navigate('/signup') } className="border py-2 text-lg sm:text-xl border-gray-900 bg-gray-900 text-white  hover:border-gray-700 hover:bg-gray-700 transition-all duration-300">Sign up</button>
				</div>

				<p className="font-thin text-center mt-1 text-xs">Developed by Daniel Shan Balico</p>
			</div>
		</div>
	)
}

export default Landing