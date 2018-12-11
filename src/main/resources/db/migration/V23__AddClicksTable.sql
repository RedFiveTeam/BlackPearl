CREATE TABLE click (
    id INT (11) NOT NULL AUTO_INCREMENT,
    resourceID INT NOT NULL,
    day INT (11) NOT NULL,
    clicks INT (11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (resourceID) REFERENCES resource(id)
);

ALTER TABLE login
    RENAME TO metric;