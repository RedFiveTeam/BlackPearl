CREATE TABLE weather (
  id INT (11) NOT NULL AUTO_INCREMENT,
  url TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO weather (url) VALUES
("https://weather.com");