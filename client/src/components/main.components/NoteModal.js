import React from 'react'
import { Dialog } from '@headlessui/react';

import Modal from './../Modal';
import TextField from './../TextField';
import TextAreaField from './../TextAreaField';
import RadioButtonField from './../RadioButtonField';

import { Formik, Form } from 'formik';
import { validateAddNote } from './../validation.form';

/*

	edit: Boolean 		   // If the value is true, the page is in edit note mode. else the page is in add note mode
	noteDetails: Object    // To show the current values of the note if in edit note mode.
	handleSubmit: Function // Function to call on form submit. The function is different if in edit mode or add mode.

	// Modal Open/Close
	cancelButtonRef, openModal, setOpenModal

*/

function NoteModal({edit, noteDetails, cancelButtonRef, openModal, setOpenModal, handleSubmit}) {
	return (
		<Modal cancelButtonRef={ cancelButtonRef } openModal={ openModal } setOpenModal={ setOpenModal }>
			<div className="bg-white p-6">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-normal text-gray-900 mb-2 ">
                        	{ edit ? "Edit Note" 
                        		   : "Add Note" }
                        </Dialog.Title>	     

						<Formik 
							initialValues = { edit ? { title: noteDetails.noteTitle, note: noteDetails.noteDescription, color: noteDetails.noteColor } 
												   : { title: '', note: '', color: ''} }	
							validationSchema = { validateAddNote } 
							onSubmit={ (values) => { if (edit) handleSubmit(noteDetails.noteID, values); else handleSubmit(values); } } >
							
							{ formik => (
								<Form>
									<TextField name="title" type="text" placeholder="Title"/>
									<TextAreaField name="note" type="text" placeholder="Note"/>
									
									<p className="mt-3 font-normal">Note Color</p>

								  	{/* Colors */}
									<div className="flex mt-2 gap-2">
										{/* 1st Column*/}
										<div>
											<div className="form-check">
												<RadioButtonField value="bg-gray-500" type="radio" name="color" id="color1"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color1">
													<div className="bg-gray-500 p-2 rounded"></div>
												</label>
											</div>

											<div className="form-check">
												<RadioButtonField value="bg-blue-500" type="radio" name="color" id="color2"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color2">
													<div className="bg-blue-500 p-2 rounded"></div>
												</label>
											</div>
										</div>

										{/* 2nd Column*/}
										<div>
											<div className="form-check">
												<RadioButtonField value="bg-red-500" type="radio" name="color" id="color3" />
												<label className="form-check-label inline-block text-gray-800" htmlFor="color3">
													<div className="bg-red-500 p-2 rounded"></div>
												</label>
											</div>

											<div className="form-check">
												<RadioButtonField value="bg-indigo-500" type="radio" name="color" id="color4"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color4">
													<div className="bg-indigo-500 p-2 rounded"></div>
												</label>
											</div>
										</div>

										{/* 3rd Column*/}
										<div>
											<div className="form-check">
												<RadioButtonField value="bg-green-500" type="radio" name="color" id="color5" />
												<label className="form-check-label inline-block text-gray-800" htmlFor="color5">
													<div className="bg-green-500 p-2 rounded"></div>
												</label>
											</div>

											<div className="form-check">
												<RadioButtonField value="bg-purple-500" type="radio" name="color" id="color6"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color6">
													<div className="bg-purple-500 p-2 rounded"></div>
												</label>
											</div>
										</div>

										{/* 4th Column*/}
										<div>
											<div className="form-check">
												<RadioButtonField value="bg-pink-500" type="radio" name="color" id="color7" />
												<label className="form-check-label inline-block text-gray-800" htmlFor="color7">
													<div className="bg-pink-500 p-2 rounded"></div>
												</label>
											</div>

											<div className="form-check">
												<RadioButtonField value="bg-yellow-800" type="radio" name="color" id="color8"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color8">
													<div className="bg-yellow-800 p-2 rounded"></div>
												</label>
											</div>
										</div>

										{/* 5th Column*/}
										<div>
											<div className="form-check">
												<RadioButtonField value="bg-orange-500" type="radio" name="color" id="color9" />
												<label className="form-check-label inline-block text-gray-800" htmlFor="color9">
													<div className="bg-orange-500 p-2 rounded"></div>
												</label>
											</div>

											<div className="form-check">
												<RadioButtonField value="bg-sky-500" type="radio" name="color" id="color10"/>
												<label className="form-check-label inline-block text-gray-800" htmlFor="color10">
													<div className="bg-sky-500 p-2 rounded"></div>
												</label>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-2 text-center mt-4">
					                    <button type="button" className="sm:mt-0 w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-100 sm:w-auto sm:text-sm duration-300" onClick={() => setOpenModal(false)} ref={ cancelButtonRef }>
					                        Cancel
					                    </button>

					                    <button type="submit" className="w-full inline-flex justify-center border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm duration-300">
					                        { edit ? "Edit Note" : "Add Note"}
					                    </button>   
					                </div>
				               	</Form>	
				            )}
				        </Formik>
					</div>
		        </div>  
	        </div>	
		</Modal>
	)
}

export default NoteModal