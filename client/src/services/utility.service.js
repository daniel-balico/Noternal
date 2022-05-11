import axios from 'axios';
import options from './service.options';

const url = process.env.REACT_APP_API_URL;

export const sendCode = (data) => {
	   return axios.post(`${url}/utility/sendcode`, data, options); }

export const encrypt = (data) => {
	   return axios.post(`${url}/utility/encrypt`, data, options); }

export const compare = (data) => {
	   return axios.post(`${url}/utility/compare`, data, options); }