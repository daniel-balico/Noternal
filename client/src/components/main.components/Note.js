import React, {useState, useRef} from 'react'

import { Close, Pen, Eye } from './../Icons';

import NoteModal from './NoteModal';
import NoteDetailModal from './NoteDetailModal';

function Note({noteID, noteColor, noteTitle, noteDescription, noteDate, handleDeleteNote, handleEditNote}) {
	const [openEditNoteModal, setOpenEditNoteModal] = useState(false); 	   // State whether to open edit note modal
	const [openNoteDetailModal, setOpenNoteDetailModal] = useState(false); // State whether to open note detail modal

	const cancelButtonRef = useRef(null);

	// const getDate = () => {
	// 	const date = new Date(noteDate);
	// 	return date.toLocaleDateString("en-US")
	// }

	const _handleEditNote = (id, values) => {
		handleEditNote(id, values);
		setOpenEditNoteModal(false);
	}

	return (
		<div className={`${noteColor} cursor-pointer relative text-left h-36 hover:scale-105 transition-all duration-500 text-white p-5 block object-cover object-center rounded overflow-hidden`}>
			<button onClick={() => setOpenNoteDetailModal(true)} className="absolute h-4 w-4 right-12 top-2 hover:scale-125 transition-all duration-300">
				<Eye />
			</button>

			<button onClick={() => setOpenEditNoteModal(true)} className="absolute h-4 w-4 right-6 top-2 hover:scale-125 transition-all duration-300">
				<Pen />
			</button>

			<button onClick={() => handleDeleteNote(noteID)} className="absolute h-4 w-4 right-1 top-2 hover:scale-125 transition-all duration-300">
				<Close />
			</button>

			<h4 className="font-medium">{ noteTitle }</h4>

			<p className="line-clamp-3 font-light">{ noteDescription }</p>

			<NoteModal cancelButtonRef={ cancelButtonRef }
				       handleSubmit={ _handleEditNote } 
				       openModal={ openEditNoteModal }
				       setOpenModal={ setOpenEditNoteModal } 
				       edit={true}
				       noteDetails={{ noteID, noteTitle, noteDescription, noteColor }}
				       />

			<NoteDetailModal cancelButtonRef={ cancelButtonRef }
							 openModal={ openNoteDetailModal }
				       		 setOpenModal={ setOpenNoteDetailModal }
				       		 noteDetails={{ noteID, noteTitle, noteDescription, noteColor, noteDate }}
							/>				
		</div>
	)
}

export default Note