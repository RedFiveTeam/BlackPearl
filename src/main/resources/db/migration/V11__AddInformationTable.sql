CREATE TABLE information (
  id INT (11) NOT NULL AUTO_INCREMENT,
  name VARCHAR (64) NOT NULL,
  content VARCHAR (64) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO information (name, content) VALUES
("Image Server", "earth.gvs.nga.smil.mil"),
("Image Server (JWICS)", "earth.gvs.nga.ic.gov"),
("AUAB", "irc1.auab.aorcentaf.af.smil.mil"),
("NAVCENT", "chat.ior.navy.smil.mil"),
("DSN", "575-1410"),
("SVOIP", "302-574-0375(0376)"),
("TSVOIP", "984-4971");