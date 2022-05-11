import React from 'react'

import Modal from './../Modal';
import { Dialog } from '@headlessui/react';
import { Close } from './../Icons';

function NoteDetailModal({ cancelButtonRef, openModal, setOpenModal, noteDetails}) {
	
	const getDate = () => { // Format date.
		const date = new Date(noteDetails.noteDate);
		return date.toLocaleDateString("en-US")
	}

	return (
		<Modal cancelButtonRef={ cancelButtonRef } openModal={ openModal } setOpenModal={ setOpenModal }>
			<div className={`${noteDetails.noteColor} relative p-5 max-w-max min-w-[256px] rounded`}>
				<button onClick={() => setOpenModal(false)} className="absolute h-4 w-4 text-white right-1 top-1 hover:scale-125 transition-all duration-300">
					<Close />
				</button>

				<div className="sm:flex sm:items-start mb-2">
                    <div className="mt-3 w-full sm:mt-0 sm:text-left">
                    	<Dialog.Title as="h3" className="text-lg leading-6 font-normal text-white mb-1">
                        	{ noteDetails.noteTitle }
                        </Dialog.Title>

                        <p className="text-white">{ noteDetails.noteDescription}</p>
                    	
                    	<p className="text-xs text-gray-200 font-thin absolute bottom-1 right-2">{ getDate() }</p>
                    </div>
                </div>
			</div>
		</Modal>
	)
}

export default NoteDetailModal