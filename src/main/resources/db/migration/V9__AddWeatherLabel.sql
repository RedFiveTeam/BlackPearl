ALTER TABLE weather
    ADD COLUMN label VARCHAR(32);

UPDATE weather
    SET label="USA",
    url="https://weather.com/weather/today/l/USDC0001:1:US";

INSERT INTO weather (url, label) VALUES
    ("https://weather.com/weather/today/l/CAXX0504:1:CA", "CAN"),
    ("https://weather.com/weather/today/l/ASXX0112:1:AS", "AUS"),
    ("https://weather.com/weather/today/l/BOXX2872:1:BO", "EUR");