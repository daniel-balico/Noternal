import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import * as api from './../services/notes.service';

import NoteModal from './../components/main.components/NoteModal';
import Note from './../components/main.components/Note';
import { PlusCircle } from './../components/Icons';

import default_pic from './../images/default.png'

import { getUser, isAuthenticated } from './../services/auth.service';

function Main(props) {
	const navigate = useNavigate();

	const [notes, setNotes] = useState([]); // State where all the queried notes are stored.

	// Modal
	const [openModal, setOpenModal] = useState(false);
	const cancelButtonRef = useRef(null);

	const fetchdata = async () => {
		// API call to read all the notes of the authenticated user from the mongodb database.
		await api.readAll().then(res => setNotes(res.data.notes));
	};

	useEffect(() => {
		isAuthenticated().then(authResponse => { // API call to check whether the user is authenticated.
			if(authResponse.data.isLoggedIn === false) window.location.replace('/signin'); // If not authenticated, redirect to signin page

			/* 
				API call to get the current user's details.
				The isAuthenticated API call returns a response that includes the current user's account id,
				therefore is used to get the account information.
			*/
			getUser('id', authResponse.data.id)
		    .then(getUserResponse => {
			  	if(!getUserResponse.data.verified) window.location.replace('/verification');
		    })
		})

		fetchdata();
	}, [])

	const handleAddNote = async (values) => {
		const newNote = { title: values.title,
						  note: values.note,
						  color: values.color };

		await api.createNote(newNote)
			  	 .then(res => console.log(res));

		fetchdata(); setOpenModal(false);
	}

	const handleEditNote = async (id, values) => {
		const updatedNote = { title: values.title,
							  note: values.note,
							  color: values.color }

		await api.updateNote(id, updatedNote)
			  	 .then(res => console.log(res))

		fetchdata(); setOpenModal(false);
	}

	const handleDeleteNote = (id) => {
		api.deleteNote(id)
		   .then(() => fetchdata());
	}
 	
 	// Trigger open/close animation for navigation
	const handleWipeLeft = () => {
		const wipeLeft = document.getElementById("wipe-left");

		if(wipeLeft.classList.contains('hidden')) {
			wipeLeft.classList.remove ('animation_wipe-right');
			wipeLeft.classList.add    ('animation_wipe-left');
			wipeLeft.classList.remove ('hidden');
		}
		else {
			wipeLeft.classList.remove ('animation_wipe-left');
			wipeLeft.classList.add    ('animation_wipe-right');

			setTimeout(() => wipeLeft.classList.add('hidden'), 300);
		}
	}

	return (
		<div className="bg-white h-screen py-16 px-5 sm:px-12">
			<div className="fixed flex px-5 sm:px-12 justify-between top-0 left-0 w-full p-4">
				<button onClick={ () => window.location.reload(true) } 
						className="text-3xl tracking-tighter font-thin uppercase self-center">
					<span className="font-normal">Note</span>rnal
				</button>

				<div className="self-center flex">
					<button onClick={() => handleWipeLeft()}>
						<img className="self-center rounded-full h-8 w-8" src={ default_pic } alt="profile" />
					</button>
				</div>

				<div id="wipe-left" className="self-center hidden flex absolute right-16 sm:right-24 top-5 text-gray-900 font-light bg-white">
					<button onClick={ () => navigate('/profile') } 
							className="bg-gray-100 hover:bg-gray-200 py-1 px-2 transition-all duration-500">Profile</button>

					<button onClick={() => { localStorage.removeItem('token'); window.location.replace('/signin'); }} 
							className="hover:bg-gray-200 bg-gray-100 py-1 px-2 transition-all duration-500">Log out</button>
				</div>
			</div>	
			
			{/* Display all the queried notes to the page */}
			{
				notes && notes.length > 0 ? (
					<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4">
						{
							notes.map((note) => {
								return (
									<Note key={note._id}
										  noteTitle={note.title} 
										  noteDescription={note.note} 
										  noteColor={note.color}
										  noteID={note._id}
										  handleEditNote={handleEditNote}
										  handleDeleteNote={handleDeleteNote} 
										  noteDate={note.updatedAt} />
								)
							})
						}
					</div>

				) : ( <p className="mt-8 text-center text-gray-500">There are no notes.</p> )
			}
					
			<button 
				title="Add Note" onClick={() => { setOpenModal(true) }} className="fixed text-gray-800 h-24 w-24 bottom-3 drop-shadow-lg right-3 p-3 hover:-translate-y-3 transition-all duration-300">
				<PlusCircle  />
			</button>

			{/* Modal */}
			<NoteModal 
				cancelButtonRef={cancelButtonRef}
				handleSubmit={handleAddNote}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>
		</div>
	)
}

export default Main