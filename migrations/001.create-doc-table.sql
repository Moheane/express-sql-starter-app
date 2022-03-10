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
	id INTEGER NOT NULL,
	username   TEXT    NOT NULL,
    userpassword INTEGER NOT NULL,
	dateCreated TIMESTAMP DEFAULT (datetime('now','localtime')),
	
);

create table adminTable (
	id INTEGER NOT NULL,
	username   TEXT    NOT NULL,
    userpassword INTEGER NOT NULL,
	dateCreated TIMESTAMP DEFAULT (datetime('now','localtime')),
	
);

INSERT INTO docTable (ID,doc,code,ref,referral, report)
VALUES ( 101,'aww.pdf','12345', '33442', 'none', 'test.pdf' );