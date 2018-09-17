CREATE TABLE person (
  id INT (11) NOT NULL AUTO_INCREMENT,
  last_name VARCHAR (64) NOT NULL,
  first_name VARCHAR (64) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE resources (
  id INT (11) NOT NULL AUTO_INCREMENT,
  url VARCHAR (128) NOT NULL,
  name VARCHAR (64) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO person (last_name, first_name) VALUES
("Arnold", "Aaron"),
("Bass", "Kenyetta"),
("Combs", "Andy"),
("Corsaut", "George"),
("Cronin", "Tyler"),
("Hoag", "Jacy"),
("Rimer", "Jason"),
("Schroeder", "Bradford"),
("Wilson", "Dylan");

INSERT INTO resources (url, name) VALUES
("https://www.google.com", "Google");