import React from 'react'
import { useField } from 'formik';

function RadioButtonField({ ...props }) {
	const [ field, meta ] = useField(props);

	return (
		<input className={ `${meta.touched && meta.error && 'border-red-500 bg-red-500' } 
			form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-gray-800 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer` }
			{...field} {...props} />
	)
}

export default RadioButtonField