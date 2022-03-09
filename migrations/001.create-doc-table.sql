create table docTable (
	id INTEGER NOT NULL,
 newdate   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   doc         TEXT,
	code   TEXT    NOT NULL,
	ref   TEXT    NOT NULL,
	referral   TEXT    NOT NULL,
	report BLOB
	
);

INSERT INTO docTable (ID,doc,code,ref,referral, report)
VALUES ( 101,'aww.pdf','12345', '33442', 'none', 'test.pdf' );