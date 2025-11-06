SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Create Races table
-- -----------------------------------------------------
DROP TABLE IF EXISTS Races;

CREATE TABLE IF NOT EXISTS Races (
    raceID      INT NOT NULL AUTO_INCREMENT,
    name        varchar(255) NOT NULL,
    date        DATE NOT NULL,
    distance    INT NOT NULL,
    type        ENUM('road', 'trail'),
    PRIMARY KEY (raceID)
);

-- -----------------------------------------------------
-- Create AidStations table
-- -----------------------------------------------------

DROP TABLE IF EXISTS AidStations;

CREATE TABLE IF NOT EXISTS AidStations (
    stationID   INT NOT NULL AUTO_INCREMENT,
    raceID      INT,
    name        VARCHAR(255),
    mileMarker  DECIMAL(6),
    elevation   DECIMAL(6),
    latitude    DECIMAL(6),
    longitude   DECIMAL(6),
    PRIMARY KEY (stationID),
    FOREIGN KEY (raceID) REFERENCES Races(raceID) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Create Volunteers table
-- -----------------------------------------------------

DROP TABLE IF EXISTS Volunteers;

CREATE TABLE IF NOT EXISTS Volunteers (
    volunteerID INT NOT NULL AUTO_INCREMENT,
    fname       VARCHAR(50) NOT NULL,
    lname       VARCHAR(50) NOT NULL,
    email       VARCHAR(50) NOT NULL,
    phone       VARCHAR(20),
    role        VARCHAR(50),
    PRIMARY KEY (volunteerID)
);

-- -----------------------------------------------------
-- Create Supplies table
-- -----------------------------------------------------

DROP TABLE IF EXISTS Supplies;

CREATE TABLE IF NOT EXISTS Supplies (
    supplyID INT NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255) NOT NULL,
    category    ENUM('food', 'drink', 'medical', 'other'),
    PRIMARY KEY (supplyID)
);

-- -----------------------------------------------------
-- Create AidStationsVolunteers intersection table
-- -----------------------------------------------------

DROP TABLE IF EXISTS AidStationVolunteers;

CREATE TABLE IF NOT EXISTS AidStationVolunteers (
    stationVolunteerID   INT NOT NULL AUTO_INCREMENT,
    stationID            INT,
    volunteerID          INT,
    PRIMARY KEY (stationVolunteerID),
    FOREIGN KEY (stationID) REFERENCES AidStations(stationID) ON DELETE CASCADE,
    FOREIGN KEY (volunteerID) REFERENCES Volunteers(volunteerID) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Create AidStationsSupplies intersection table
-- -----------------------------------------------------

DROP TABLE IF EXISTS AidStationSupplies;

CREATE TABLE IF NOT EXISTS AidStationSupplies (
    stationSupplyID     INT NOT NULL AUTO_INCREMENT,
    stationID           INT,
    supplyID            INT,
    quantity            INT, 
    PRIMARY KEY (stationSupplyID),
    FOREIGN KEY (stationID) REFERENCES AidStations(stationID)ON DELETE CASCADE,
    FOREIGN KEY (supplyID) REFERENCES Supplies(supplyID) ON DELETE RESTRICT
);

-- -----------------------------------------------------
-- Insert sample data
-- -----------------------------------------------------

INSERT INTO Races (name, date, distance, type)
VALUES ('Over the Hills', '2024-12-12', 12, 'trail'),
       ('Country Cross', '2020-10-10', 52, 'road'),
       ('Ultra Run', '2026-03-03', 146, 'road');

INSERT INTO AidStations (raceID, name,  mileMarker, elevation, latitude, longitude)
VALUES ((SELECT raceID FROM Races WHERE name = 'Country Cross'), 'The Hub', 3, 1000, 22, 123),
       ((SELECT raceID FROM Races WHERE name = 'Country Cross'), 'Free Candy', 36, 324, 45, -180),
       ((SELECT raceID FROM Races WHERE name = 'Ultra Run'), 'Gatorade Pool', 100, 6523, 90, 4);

INSERT INTO Volunteers (fname, lname, email, phone, role)
VALUES ('James', 'Humphrey', 'james@wow.com', '111-111-1111', 'janitor'),
       ('Donald', 'Duck', 'donald@wow.com', '222-222-2222', 'bottle filler'),
       ('Toby', 'Johnson', 'toby@wow.com', '333-333-3333', 'cheerleader');

INSERT INTO Supplies (name, category)
VALUES ('Gatorade', 'drink'),
       ('Protein Bar', 'food'),
       ('Ice Pack', 'medical');

INSERT INTO AidStationVolunteers (stationID, volunteerID)
VALUES ((SELECT stationID FROM AidStations WHERE name = 'Free Candy'),
        (SELECT volunteerID FROM Volunteers WHERE fname = 'James' AND lname = 'Humphrey')),
       ((SELECT stationID FROM AidStations WHERE name = 'Free Candy'),
        (SELECT volunteerID FROM Volunteers WHERE fname = 'Donald' AND lname = 'Duck')),
       ((SELECT stationID FROM AidStations WHERE name = 'Gatorade Pool'),
        (SELECT volunteerID FROM Volunteers WHERE fname = 'Toby' AND lname = 'Johnson'));

INSERT INTO AidStationSupplies (stationID, supplyID, quantity)
VALUES ((SELECT stationID FROM AidStations WHERE name = 'The Hub'),
        (SELECT supplyID FROM Supplies WHERE name = 'Ice Pack'), 100),
       ((SELECT stationID FROM AidStations WHERE name = 'The Hub'),
        (SELECT supplyID FROM Supplies WHERE name = 'Protein Bar'), 12),
       ((SELECT stationID FROM AidStations WHERE name = 'Gatorade Pool'),
        (SELECT supplyID FROM Supplies WHERE name = 'Protein Bar'), 5435);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;