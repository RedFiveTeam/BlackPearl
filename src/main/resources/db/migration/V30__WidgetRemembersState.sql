ALTER TABLE account ADD COLUMN widgets tinyint(1);

UPDATE account SET widgets = 1;