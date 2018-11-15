CREATE TABLE operation (
    id INT (11) NOT NULL AUTO_INCREMENT,
    title VARCHAR (64) NOT NULL,
    description VARCHAR (128) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO operation (title, description) VALUES
    ("OP OTTERBALL", "Operation Otterball is fun"),
    ("OP HALLOWEENTOWN", "It is pretty scary!"),
    ("OP HAPPY FEET", "Dance dance dance!"),
    ("OP DAYWALKER", "RUN!"),
    ("OP TORTUGA", "WHERE'S THE BEER!?!");
