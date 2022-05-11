import React from 'react'
import { ErrorMessage, useField } from 'formik';

function TextField({ ...props }) {
	const [ field, meta ] = useField(props);

	return (
		<div className="h-15">
			<input className={ `${ meta.touched && meta.error && 'border-red-500 text-red-600 border-red-600 ring-red-600 placeholder-red-600'}
							  form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-gray-300 rounded transition ease-in-out m-0 
							  border py-2 px-2 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300` }
				   autoComplete="off"
				   {...field} {...props} />

			  { <ErrorMessage name={field.name} 
			   				 component="p" 
			   				 className=" bottom-0 text-xs font-light text-red-600"/> }
		</div>
	)
}

export default TextField

