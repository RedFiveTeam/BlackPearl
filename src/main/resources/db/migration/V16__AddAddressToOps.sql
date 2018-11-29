ALTER TABLE operation
ADD address VARCHAR (128) NOT NULL;

UPDATE operation
SET address = 'https://www.opone.com'
WHERE id = 1;

UPDATE operation
SET address = 'https://www.optwo.com'
WHERE id = 2;

UPDATE operation
SET address = 'https://www.opthree.com'
WHERE id = 3;

UPDATE operation
SET address = 'https://www.opfour.com'
WHERE id = 4;

UPDATE operation
SET address = 'https://www.opfive.com'
WHERE id = 5;