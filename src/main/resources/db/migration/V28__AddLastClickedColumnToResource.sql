ALTER TABLE resource ADD COLUMN clicked INT(20);

UPDATE resource SET clicked = UNIX_TIMESTAMP();