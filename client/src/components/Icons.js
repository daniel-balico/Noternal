import React from 'react'

export const ArrowLeft = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
		</svg>
	)
}

export const PlusCircle = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props}  viewBox="0 0 20 20" fill="currentColor">
			<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
		</svg>
	)
}

export const Moon = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
		  	<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
	)
}

export const Close = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
		  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
		</svg>
	)
}

export const Pen = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
		  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
		</svg>
	)
}

export const Eye = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
		  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
		  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
		</svg>
	)
}