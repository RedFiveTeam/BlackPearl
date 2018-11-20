ALTER TABLE resource
    ADD COLUMN position INT (11);

INSERT INTO resource (url, name, categoryID, accountID, position) VALUES
("https://www.fav1.com", "Fav 1", 0, "Guest", 0),
("https://www.fav2.com", "Fav 2", 0, "Guest", 1),
("https://www.fav3.com", "Fav 3", 0, "Guest", 2);