import React from 'react'
import { ErrorMessage, useField } from 'formik';

function TextAreaField({ ...props }) {
	const [ field, meta ] = useField(props);

	return (
		<div className="relative leading-3">
			<textarea className={ `${meta.touched && meta.error && 'border-red-500 text-red-500 border-red-500 ring-red-500' } 
							       w-full border border-gray-300 py-2 px-2 focus:outline-none focus:border-gray-300 rounded focus:ring-1 focus:ring-gray-300` }
				   	  autoComplete="off"
				   	  rows="5"
				   	  {...field} {...props} />

			  { <ErrorMessage name={field.name} 
			   				  component="p"
			   				  className="mt-0 text-xs font-light text-red-500"/> }
		</div>
	)
}

export default TextAreaField