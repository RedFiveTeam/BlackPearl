ALTER TABLE metric
    ADD COLUMN timeInt int(20);

UPDATE metric
    SET timeInt = UNIX_TIMESTAMP(time) - 18000;

ALTER TABLE metric
    DROP COLUMN time;

ALTER TABLE metric CHANGE `timeInt` `time` int(20);
