ALTER TABLE resource
  ADD COLUMN categoryID INT(11);

UPDATE resource
  SET categoryID = 1;

INSERT INTO resource (url, name, categoryID) VALUES
  ("https://www.youtube.com", "YouTube", 2),
  ("https://www.uber.com", "Uber", 2),
  ("https://www.reddit.com", "Reddit", 3),
  ("https://www.twitter.com", "Twitter", 3);
