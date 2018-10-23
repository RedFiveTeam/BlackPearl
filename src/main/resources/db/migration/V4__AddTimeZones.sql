CREATE TABLE timezone (
  id INT(11) NOT NULL AUTO_INCREMENT,
  zone VARCHAR(64) NOT NULL,
  name VARCHAR(64) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO timezone (zone, name) VALUES
("America/New_York", "LANGLEY"),
("America/Los_Angeles", "PACIFIC"),
("America/Chicago", "CENTRAL"),
("Pacific/Honolulu", "HAWAII"),
("Europe/Berlin", "GERMANY"),
("Etc/UTC", "ZULU");