const express = require('express');
const exphbs = require('express-handlebars');
const factorys = require('./factory')
const xpsession = require('sessions');

let factory = factorys()

// import sqlite modules
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const app = express();
const PORT = process.env.PORT || 3017;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// database setup starts here
open({
	filename: './data.db',
	driver: sqlite3.Database
}).then(async (db) => {

	// only setup the routes once the database connection has been established

	await db.migrate();



	app.get('/', async function (req, res) {

		const counter = await db.get('select * from userTable');

		console.log(counter)

		res.render('index');
	});

	

	app.post('/', async function (req, res) {
		// const counter = await db.get('select * from userTable');

		// console.log(counter)

		const {id, newdate, ref, code, referral,report} = req.body;

		await db.run('insert into docTable(id, ref, code, referral, report) values (?,?,?,?,?)', [id,ref,code,referral,report])

		// console.log(id+' '+newdate)

		res.redirect('/')
	});


	
	app.get('/admin', async function (req, res) {
		factory.reset()
		userv = factory.getuser()
		receipts = await db.all(
			"select * from docTable"
		  );
		console.log(receipts)
		

		res.render('admin', {
			receipts: receipts, userv: userv
		});
	});

	app.get('/userList', async function (req, res) {
		factory.setshowuser()
		// console.log(factory.getuser())
		res.redirect('/admin')
	});


	app.get('/file/:name', async function (req, res) {
		
		pname = req.params.name

		receipts = await db.get(
			"select report from docTable where report = (?)", pname
		  );

		//   console.log(receipts)

		  thefile = res.download(receipts)

		//   console.log(thefile)

		

		res.redirect('/');
	});

		app.post('/', async function (req, res) {

		const {id, newdate, ref, code, referral,report} = req.body;

		await db.run('insert into docTable(id, ref, code, referral, report) values (?,?,?,?,?)', [id,ref,code,referral,report])

		// console.log(id+' '+newdate)

		res.redirect('/')
	});

	app.get('/login', async function (req, res) {

		res.render('login');
	});

	app.post('/login', async function (req, res) {

		res.redirect('/');
	});


	app.get('/adminLogin', async function (req, res) {
		
		res.render('loginAdmin');
	});

	app.post('/adminLogin', async function (req, res) {

		res.redirect('/admin');
	});


	app.get('/adminregister', async function (req, res) {

		res.render('adminRegister');
	});


	app.post('/adminregister', async function (req, res) {
		let {username, email, password, password2} = req.body;

		if (username && email && password && password2) {
			await db.run('insert into adminTable(username, email, password, password2) values (?,?,?,?)', [username,email,password,password2])
			res.redirect('/adminLogin');
		}else{
			res.redirect('/adminRegister');
		}
	});



	app.get('/register', async function (req, res) {

		res.render('register');
	});

	app.post('/register', async function (req, res) {
		let {username, email, password, password2} = req.body;

		if (username && email && password && password2) {
			await db.run('insert into userTable(username, email, password, password2) values (?,?,?,?)', [username,email,password,password2])
			const counter = await db.get('select * from userTable');
			res.redirect('/login');
			console.log('success')
			console.log(counter)
		}else{
			res.redirect('/register');
			console.log('404')
		}

	});




	// start  the server and start listening for HTTP request on the PORT number specified...
	app.listen(PORT, function () {
		console.log(`App started on port ${PORT}`)
	});

});


