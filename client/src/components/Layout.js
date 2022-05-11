import React from 'react'

function Layout({ children }) {
	return (
		<div className="bg-gray-100 flex justify-center h-screen">
			<div className="relative w-full sm:w-128 self-center mx-4">
				<div className="bg-white shadow-md rounded-md sm:w-full pt-5">
					{ children }
				</div>
			</div>
		</div>
	)
}

export default Layout