ALTER TABLE timezone ADD COLUMN position INT(11) NOT NULL;

UPDATE timezone
SET position = 1
WHERE id = 1;

UPDATE timezone
SET position = 2
WHERE id = 2;

UPDATE timezone
SET position = 3
WHERE id = 3;

UPDATE timezone
SET position = 4
WHERE id = 4;

UPDATE timezone
SET position = 5
WHERE id = 5;

UPDATE timezone
SET position = 6
WHERE id = 6;