ALTER TABLE resource
    ADD COLUMN accountID VARCHAR (128);

INSERT INTO resource (url, name, categoryID, accountID) VALUES
("https://www.google.com", "Guest's Google", 0, "Guest"),
("https://www.facebook.com", "Guest's Facebook", 0, "Guest"),
("https://www.google.com", "Jordan's Google", 0, "JORDAN"),
("https://www.facebook.com", "Jordan's Facebook", 0, "JORDAN"),
("https://www.google.com", "Yoda's Google", 0, "YODA"),
("https://www.facebook.com", "Yoda's Google", 0, "YODA");