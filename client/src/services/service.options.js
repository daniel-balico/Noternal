const options = {
	headers: {
		authorization: localStorage.getItem('token'),
		'x-noternal-api-key': process.env.REACT_APP_API_KEY
	}
}

export default options;