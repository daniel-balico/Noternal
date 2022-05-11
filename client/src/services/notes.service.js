import axios from 'axios';
import options from './service.options';

const url = process.env.REACT_APP_API_URL;

export const createNote = newNote => { 
	   return axios.post(`${url}/note/create`, newNote, options) }

export const readAll = () => {
	   return axios.get(`${url}/note/read`, options); }

export const readNote = id => {
	   return axios.get(`${url}/note/read/${id}`, options) }

export const updateNote = (id, updatedNote) => { 
	   return axios.put(`${url}/note/update/${id}`, updatedNote, options) }

export const deleteNote = id => {
	   return axios.delete(`${url}/note/delete/${id}`, options) }

