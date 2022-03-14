create table docTable (
	id INTEGER NOT NULL,
 newdate   TIMESTAMP DEFAULT (datetime('now','localtime')),
   doc         TEXT,
	code   TEXT    NOT NULL,
	ref   TEXT    NOT NULL,
	referral   TEXT    NOT NULL,
	report BLOB
	
);

create table userTable (
	userid integer PRIMARY KEY NOT NULL,
	username   TEXT    NOT NULL,
	email   TEXT    NOT NULL,
	password   TEXT    NOT NULL,
    password2 INTEGER NOT NULL,
	dateCreated TIMESTAMP DEFAULT (datetime('now','localtime'))
	
);

INSERT INTO userTable (username,email,password,password2)
VALUES ( 'user101','user101@gmail.com', '1234', '1234' );


create table adminTable (
	userid integer PRIMARY KEY NOT NULL,
	username   TEXT    NOT NULL,
	email   TEXT    NOT NULL,
	password   TEXT    NOT NULL,
    password2 INTEGER NOT NULL,
	dateCreated TIMESTAMP DEFAULT (datetime('now','localtime'))
	
);

INSERT INTO docTable (ID,doc,code,ref,referral, report)
VALUES ( 101,'aww.pdf','12345', '33442', 'none', 'test.pdf' );