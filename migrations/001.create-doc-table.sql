create table docTable (
	id INTEGER NOT NULL,
 newdate   TEXT    NOT NULL,
   doc         TEXT,
	code   TEXT    NOT NULL,
	ref   TEXT    NOT NULL,
	referral   TEXT    NOT NULL,
	
);

INSERT INTO docTable (ID,newdate,doc,code,ref,referral)
VALUES ( 101, '01 Jan 2022','aww.pdf','6899', '776', 'none' );