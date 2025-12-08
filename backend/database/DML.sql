-- Text that follows @ denotes user input that will be relayed through 
-- the backend server to the database.


----------------------------------------------------------------
-------------RACES----------------------------------------------
----------------------------------------------------------------
-- See all races for the main races page
SELECT *
FROM Races;

-- Add a new race 
INSERT INTO Races (name, date, distance, type)
VALUES (@raceName, @raceDate, @raceDistance, @RaceType);

-- Edit a race 
UPDATE Races
SET @raceAttributes = @values
WHERE raceID = @raceId;

-- Select one race and see all aid stations associated with it
SELECT *
FROM AidStations
WHERE raceID = @raceId;

-- Delete a specific race
DELETE FROM Races
WHERE raceID = @raceID;

------------------------------------------------------------------
-------------AID STATIONS ----------------------------------------
------------------------------------------------------------------
-- Add a new aid station
INSERT INTO AidStations (raceID, name, mileMarker, elevation, latitude, longitude)
VALUES (@raceID, @name, @mileMarker, @elevation, @latitude, @longitude);

-- See all aid stations
SELECT *
FROM AidStations;

-- Update Aid station
UPDATE AidStations
SET raceID = @raceID,
    name = @name,
    mileMarker = @mileMarker,
    elevation = @elevation,
    latitude = @latitude,
    longitude = @longitude
WHERE stationID = @stationID;

-- Delete Aid Station
DELETE FROM AidStations
WHERE stationID = @stationID;


--------------------------------------------------------------------
-------------AID STATION VOLUNTEERS---------------------------------
--------------------------------------------------------------------
-- See all volunteer assignments for specific aid station
SELECT *
FROM AidStationVolunteers 
WHERE stationId = @stationId;

-- Create new volunteer assignemnt
INSERT INTO AidStationVolunteers (stationID, volunteerID)
VALUES (@stationID, @volunteerID);

-- Delete Volunteer assignment
DELETE FROM AidStationVolunteers
WHERE volunteerID = @volunteerID;


--------------------------------------------------------------------
-------------AID STATION SUPPLIES-----------------------------------
--------------------------------------------------------------------
-- See all supply assignments for specific aid station
SELECT *
FROM AidStationSupplies 
WHERE stationId = @stationId;

-- Create new supply assignment
INSERT INTO AidStationSupplies (stationID, supplyID, quantity)
VALUES (@stationID, @supplyID, @quantity);

-- Delete supply assignment
DELETE FROM AidStationSupplies
WHERE stationSupplyID = @stationSupplyID;

--------------------------------------------------------------------
-------------VOLUNTEERS---------------------------------------------
--------------------------------------------------------------------
-- Create new volunteer
INSERT INTO Volunteers (fname, lname, email, phone, role)
VALUES (@fname, @lname, @email, @phone, @role);

-- See all volunteers
SELECT *
FROM Volunteers;

-- Edit Volunteer
UPDATE Volunteers
SET fname = @fname,
    lname = @lname,
    email = @email,
    phone = @phone,
    role = @role
WHERE volunteerID = @volunteerID;

-- Delete Volunteer
DELETE FROM Volunteers
WHERE volunteerID = @volunteerID;

-------------------------------------------------------------------
-------------SUPPLIES----------------------------------------------
-------------------------------------------------------------------
-- Create a new supply item
INSERT INTO Supplies (name, category)
VALUES (@name, @category);

-- Edit Supply Item
UPDATE Supplies
SET name = @name,
    category = @category
WHERE supplyID = @supplyID;

-- Delete Supply Item
DELETE FROM Supplies
WHERE supplyID = @supplyID;




