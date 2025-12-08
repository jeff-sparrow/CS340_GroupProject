DROP PROCEDURE IF EXISTS sp_reset_db;
DELIMITER //
CREATE PROCEDURE sp_reset_db()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    SET AUTOCOMMIT = 0;

    -- -----------------------------------------------------
    -- Drop and recreate Races table
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS Races;
    CREATE TABLE IF NOT EXISTS Races (
        raceID      INT NOT NULL AUTO_INCREMENT,
        name        VARCHAR(255) NOT NULL,
        date        DATE NOT NULL,
        distance    INT NOT NULL,
        type        ENUM('road', 'trail'),
        PRIMARY KEY (raceID)
    );

    -- -----------------------------------------------------
    -- Drop and recreate AidStations table
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
    -- Drop and recreate Volunteers table
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
    -- Drop and recreate Supplies table
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS Supplies;
    CREATE TABLE IF NOT EXISTS Supplies (
        supplyID INT NOT NULL AUTO_INCREMENT,
        name        VARCHAR(255) NOT NULL,
        category    ENUM('food', 'drink', 'medical', 'other'),
        PRIMARY KEY (supplyID)
    );

    -- -----------------------------------------------------
    -- Drop and recreate AidStationVolunteers table
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
    -- Drop and recreate AidStationSupplies table
    -- -----------------------------------------------------
    DROP TABLE IF EXISTS AidStationSupplies;
    CREATE TABLE IF NOT EXISTS AidStationSupplies (
        stationSupplyID     INT NOT NULL AUTO_INCREMENT,
        stationID           INT,
        supplyID            INT,
        quantity            INT,
        PRIMARY KEY (stationSupplyID),
        FOREIGN KEY (stationID) REFERENCES AidStations(stationID) ON DELETE CASCADE,
        FOREIGN KEY (supplyID) REFERENCES Supplies(supplyID) ON DELETE RESTRICT
    );

    -- -----------------------------------------------------
    -- Insert sample data
    -- -----------------------------------------------------
    INSERT INTO Races (name, date, distance, type)
    VALUES ('Over the Hills', '2024-12-12', 12, 'trail'),
           ('Country Cross', '2020-10-10', 52, 'road'),
           ('Ultra Run', '2026-03-03', 146, 'road'),
           ('Western States Endurance Run', '2026-07-28', 100, 'trail');

    INSERT INTO AidStations (raceID, name, mileMarker, elevation, latitude, longitude)
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

    SET FOREIGN_KEY_CHECKS = 1;
    COMMIT;
END //
DELIMITER ;

-- -----------------------------------------------------
-- Create Race
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_CreateRace;
DELIMITER //
CREATE PROCEDURE sp_CreateRace (
    IN p_name VARCHAR(255),
    IN p_date DATE,
    IN p_distance INT,
    IN p_type ENUM('road', 'trail'),
    OUT p_newRaceID INT
)
COMMENT 'Insert a new race and return the new raceID.'
BEGIN
    INSERT INTO Races (name, `date`, distance, `type`)
    VALUES (p_name, p_date, p_distance, p_type);
    
    SET p_newRaceID = LAST_INSERT_ID();
END //
DELIMITER ;

-- -----------------------------------------------------
-- Create Aid Station Supply
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_CreateAidStationSupply;
DELIMITER //
CREATE PROCEDURE sp_CreateAidStationSupply (
    IN  p_stationID INT,
    IN  p_supplyID  INT,
    IN  p_quantity  INT,
    OUT p_newStationSupplyID INT
)
COMMENT 'Insert a new AidStationSupplies row and return its stationSupplyID.'
BEGIN
    INSERT INTO AidStationSupplies (stationID, supplyID, quantity)
    VALUES (p_stationID, p_supplyID, p_quantity);

    SET p_newStationSupplyID = LAST_INSERT_ID();
END //
DELIMITER ;


-- -----------------------------------------------------
-- Update Race
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_UpdateRace;
DELIMITER //
CREATE PROCEDURE sp_UpdateRace (
    IN p_raceID INT,
    IN p_name VARCHAR(255),
    IN p_date DATE,
    IN p_distance INT,
    IN p_type ENUM('road', 'trail')
)
COMMENT 'Update an existing race by raceID.'
BEGIN
    UPDATE Races
    SET 
        name = p_name,
        date = p_date,
        distance = p_distance,
        type = p_type
    WHERE raceID = p_raceID;
END //
DELIMITER ;

-- -----------------------------------------------------
-- Update Aid Station Supply
-- -----------------------------------------------------
DROP PROCEDURE IF EXISTS sp_UpdateAidStationSupply;
DELIMITER //
CREATE PROCEDURE sp_UpdateAidStationSupply(
  IN p_stationSupplyID INT,
  IN p_quantity INT
)
BEGIN
  IF p_quantity <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Quantity must be positive';
  END IF;

  UPDATE AidStationSupplies
  SET quantity = p_quantity
  WHERE stationSupplyID = p_stationSupplyID;

  IF ROW_COUNT() = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No matching record found';
  END IF;
END //
DELIMITER ;

-- -----------------------------------------------------
-- Delete Race
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_DeleteRace;

DELIMITER //
CREATE PROCEDURE sp_DeleteRace(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Races WHERE raceID = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Races for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- -----------------------------------------------------
-- Delete Aid Station
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_DeleteAidStation;

DELIMITER //
CREATE PROCEDURE sp_DeleteAidStation(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM AidStations WHERE stationID = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Aid Stations for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;

-- -----------------------------------------------------
-- Delete Aid Station Supply
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_DeleteAidStationSupply;

DELIMITER //
CREATE PROCEDURE sp_DeleteAidStationSupply(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM AidStationSupplies WHERE stationSupplyID = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in AidStationSupplies for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    COMMIT;

END //
DELIMITER ;

-- -----------------------------------------------------
-- Delete Volunteer
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_DeleteVolunteer;

DELIMITER //
CREATE PROCEDURE sp_DeleteVolunteer(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Volunteers WHERE volunteerID = p_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Volunteers for id: ', p_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;


