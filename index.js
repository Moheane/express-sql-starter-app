const express = require('express');
const exphbs = require('express-handlebars');

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

		// const counter = await db.get('select * from docTable');

		res.render('index');
	});

	

	app.post('/', async function (req, res) {

		const {id, newdate, ref, code, referral,report} = req.body;

		await db.run('insert into docTable(id,newdate, ref, code, referral, report) values (?,?,?,?,?,?)', [id,newdate,ref,code,referral,report])

		console.log(id+' '+date)

		res.redirect('/')
	});


	
	app.get('/admin', async function (req, res) {

		receipts = await db.all(
			"select * from docTable"
		  );

		  console.log(receipts)

		

		res.render('admin', {
			receipts: receipts
		});
	});

	// app.post('/admin', async function (req, res) {

	// 	try {
			
	// 		console.log(req.body);

	// 		const action = req.body.action;

	// 		if (action === 'Press button to count') {

	// 			const result = await db.get('select count(*) as count from counter');
	// 			if (result.count === 0) {
	// 				await db.run('insert into counter(count) values (?)', 1)
	// 			} else {
	// 				await db.exec('update counter set count = count + 1');
	// 			}

	// 		} else if (action === 'Reset the counter') {

	// 			await db.exec('delete from counter');

	// 		} 

	// 	} catch (err) {
	// 		console.log(err);
	// 	}

	// 	res.redirect('/')
	// });


	// start  the server and start listening for HTTP request on the PORT number specified...
	app.listen(PORT, function () {
		console.log(`App started on port ${PORT}`)
	});

});


