import axios from 'axios';
import options from './service.options';

const url = process.env.REACT_APP_API_URL;

export const signIn = (data) => {
	   return axios.post(`${url}/user/signin`, data, options) }

export const signUp = (data) => {
	   return axios.post(`${url}/user/signup`, data, options); }

export const verifyAccount = (data) => {
	   return axios.post(`${url}/user/verification`, data, options); }

export const changePassword = (data) => {
	   return axios.post(`${url}/user/changepassword`, data, options); }

export const checkPassword = (data) => {
	   return axios.post(`${url}/user/checkpassword`, data, options); }

export const getUser = (type, data) => {
	   return axios.get(`${url}/user/details/${type}/${data}`, options); }

export const isAuthenticated = () => {
	   return axios.get(`${url}/user/is_authenticated`, options); }
