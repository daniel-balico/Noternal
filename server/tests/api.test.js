const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');

const server = require('./../server').app;

let User = require('./../models/user.model');

let ENVIRONMENT = require('./../server').ENVIRONMENT;

chai.should();
chai.use(chaiHttp);

let token;
let note_id;

before(done => {
	if(ENVIRONMENT != 'dev') {
		throw new Error("ENVIRONMENT NOT SET IN DEVELOPMENT MODE!");
	}
	else mongoose.connection.once('open', () => done());
} );

describe('User Route', () => {
	describe('POST user/signup', () => {
		it('should signup user', done => {
			chai.request(server)
				.post('/user/signup')
				.set({ 'x-noternal-api-key': process.env.API_KEY })
				.send({
					'firstname': 'unit',
					'lastname': 'test',
					'username': 'unit.test',
					'email': 'unit.test@gmail.com',
					'password': 'unittest'
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('success').eq(true);
					done();
				});
		});
	});

	describe("POST user/signin", () => {
		it('should signin user', done => {
			chai.request(server)
				.post('/user/signin')
				.set({ 'x-noternal-api-key': process.env.API_KEY })
				.send({
					'username': 'unit.test',
					'password': 'unittest'
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('token');
					res.body.should.have.property('success').eq(true);
					
					token = res.body.token;
					done();
				});
		})
	});

	describe("GET user/is_authenticated", () => {
		it('should check if user is authenticated', done => {
			chai.request(server)
				.get('/user/is_authenticated')
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('isLoggedIn').eq(true);
					res.body.should.have.property('username').eq('unit.test');
					done();
				})
		});
	});

	describe("POST user/verify_account", () => {
		// Change verification code manually to send a correct code
		before(done => {
			User.findOne({username: 'unit.test'})
				.then(user => {
					user.verification = { verified: false, code: 1234 };

					user.save()
						.then(() => done())
						.catch((err) => {console.log(err); done()})
				})
		});

		it('should verify user', done => {
			chai.request(server)
				.post('/user/verify_account')
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.send({
					code: 1234
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('success').eq(true);
					done();
				});
		})
	});
});


describe('Note Route', () => {
	describe('POST /note/create', () => {
		it('should add note', done => {
			chai.request(server)
				.post('/note/create')
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.send({title: 'test', note: 'test', color: 'bg-gray-600'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('id');
					res.body.should.have.property('success').eq(true);
					
					note_id = res.body.id;
					done();
				});
		});
	});

	describe('GET /note/read', () => {
		it('should read all notes', done => {
			chai.request(server)
				.get('/note/read')
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.notes.should.be.a('Array');
					res.body.should.have.property('success').eq(true);
					done();
				});
		});
	});

	describe('GET /note/read/:id', () => {
		it('should read a note', done => {
			chai.request(server)
				.get(`/note/read/${note_id}`)
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('note');
					res.body.should.have.property('success').eq(true);
					done();
				});
		});
	});

	describe('PUT /note/update/:id', () => {
		it('should update a note', done => {
			chai.request(server)
				.put(`/note/update/${note_id}`)
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.send({title: 'new_title', note: 'new_note', color: 'bg-red-600'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('success').eq(true);
					done();
				});
		});
	});

	describe('DELETE /note/delete/:id', () => {
		it('should delete a note', done => {
			chai.request(server)
				.delete(`/note/delete/${note_id}`)
				.set({ Authorization: token, 'x-noternal-api-key': process.env.API_KEY })
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('success').eq(true);
					done();
				});
		});
	});
});