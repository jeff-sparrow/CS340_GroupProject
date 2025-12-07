// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = 1775;

// ########################################
// ########## ROUTE HANDLERS

// CREATE ROUTES
app.post('/races/create', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body; // { name, date, distance, type }

        // Cleanse numeric fields
        if (isNaN(parseInt(data.distance))) data.distance = null;

        // Execute stored procedure
        const query1 = `CALL sp_CreateRace(?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [[[rows]]] = await db.query(query1, [data.name, data.date, data.distance, data.type]);

        console.log(`CREATE race. ID: ${rows.new_id} Name: ${data.name}, Date: ${data.date}, Distance: ${data.distance}, Type: ${data.type}`);

        // Send success response
        res.status(200).json({ message: 'Race created successfully' });
    } catch (error) {
        console.error('Error creating race:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.post('/volunteers/create', async (req, res) => {
    try {
        const { fname, lname, email, phone, role } = req.body;
        const query = `INSERT INTO Volunteers (fname, lname, email, phone, role)
                       VALUES (?, ?, ?, ?, ?);`;
        const [result] = await db.query(query, [fname, lname, email, phone, role]);
        res.status(200).json({ message: 'Volunteer created', id: result.insertId });
    } catch (err) {
        console.error('Error creating volunteer:', err);
        res.status(500).send('Error creating volunteer');
    }
});

app.post('/aid-stations/create', async (req, res) => {
    try {
        const { raceID, name, mileMarker, elevation, latitude, longitude } = req.body;
        const query = `INSERT INTO AidStations (raceID, name, mileMarker, elevation, latitude, longitude)
                       VALUES (?, ?, ?, ?, ?, ?);`;
        const [result] = await db.query(query, [raceID, name, mileMarker, elevation, latitude, longitude]);
        res.status(200).json({ message: 'AidStation created', id: result.insertId });
    } catch (err) {
        console.error('Error creating aid station:', err);
        res.status(500).send('Error creating aid station');
    }
});

app.post('/supplies/create', async (req, res) => {
    try {
        const { name, category } = req.body;
        const query = `INSERT INTO Supplies (name, category) VALUES (?, ?);`;
        const [result] = await db.query(query, [name, category]);
        res.status(200).json({ message: 'Supply created', id: result.insertId });
    } catch (err) {
        console.error('Error creating supply:', err);
        res.status(500).send('Error creating supply');
    }
});

app.post('/aid-station-volunteers/add', async (req, res) => {
    try {
        const { stationID, volunteerID } = req.body;
        const query = `INSERT INTO AidStationVolunteers (stationID, volunteerID) VALUES (?, ?);`;
        const [result] = await db.query(query, [stationID, volunteerID]);
        res.status(200).json({ message: 'Volunteer assigned to aid station', id: result.insertId });
    } catch (err) {
        console.error('Error adding volunteer to aid station:', err);
        res.status(500).send('Error adding volunteer to aid station');
    }
});

// UPDATE ROUTES
app.post('/races/update', async function (req, res) {
    try {
        // Parse frontend form information
        const data = req.body; // { update_race_id, update_name, update_date, update_distance, update_type }

        // Cleanse numeric fields
        if (isNaN(parseInt(data.update_distance))) data.update_distance = null;

        // Execute update stored procedure
        const query1 = 'CALL sp_UpdateRace(?, ?, ?, ?, ?);';
        const query2 = 'SELECT name, date, distance, type FROM Races WHERE raceID = ?;';

        await db.query(query1, [data.update_race_id, data.update_name, data.update_date, data.update_distance, data.update_type]);

        // Get updated record for logging
        const [[rows]] = await db.query(query2, [data.update_race_id]);

        console.log(`UPDATE race. ID: ${data.update_race_id} ` +
            `Name: ${rows.name}, Date: ${rows.date}, Distance: ${rows.distance}, Type: ${rows.type}`
        );

        // Send success status to frontend
        res.status(200).json({ message: 'Race updated successfully' });

    } catch (error) {
        console.error('Error updating race:', error);
        res.status(500).send('An error occurred while executing the database queries.');
    }
});

app.post('/aid-stations/update', async (req, res) => {
    try {
        const { stationID, raceID, name, mileMarker, elevation, latitude, longitude } = req.body;
        const query = `UPDATE AidStations SET raceID=?, name=?, mileMarker=?, elevation=?, latitude=?, longitude=?
                       WHERE stationID=?;`;
        await db.query(query, [raceID, name, mileMarker, elevation, latitude, longitude, stationID]);
        res.status(200).json({ message: 'AidStation updated' });
    } catch (err) {
        console.error('Error updating aid station:', err);
        res.status(500).send('Error updating aid station');
    }
});

app.post('/supplies/update', async (req, res) => {
    try {
        const { supplyID, name, category } = req.body;
        const query = `UPDATE Supplies SET name=?, category=? WHERE supplyID=?;`;
        await db.query(query, [name, category, supplyID]);
        res.status(200).json({ message: 'Supply updated' });
    } catch (err) {
        console.error('Error updating supply:', err);
        res.status(500).send('Error updating supply');
    }
});

app.post('/volunteers/update', async (req, res) => {
    try {
        const { volunteerID, fname, lname, email, phone, role } = req.body;
        const query = `UPDATE Volunteers SET fname=?, lname=?, email=?, phone=?, role=? WHERE volunteerID=?;`;
        await db.query(query, [fname, lname, email, phone, role, volunteerID]);
        res.status(200).json({ message: 'Volunteer information updated' });
    } catch (err) {
        console.error('Error updating volunteer information:', err);
        res.status(500).send('Error updating volunteer information');
    }
});

// DELETE ROUTES
app.post('/races/delete', async function (req, res) {
    try {
        const data = req.body; // { delete_race_id, delete_race_name }
        const query = 'DELETE FROM Races WHERE raceID = ?;';
        await db.query(query, [data.delete_race_id]);

        console.log(`DELETE race. ID: ${data.delete_race_id} Name: ${data.delete_race_name}`);

        // Send success response
        res.status(200).json({ message: 'Race deleted successfully' });
    } catch (error) {
        console.error('Error deleting race:', error);
        res.status(500).send('An error occurred while deleting the race.');
    }
});

app.post('/volunteers/delete', async (req, res) => {
    try {
        const { volunteerID } = req.body;
        await db.query('DELETE FROM Volunteers WHERE volunteerID=?;', [volunteerID]);
        res.status(200).json({ message: 'Volunteer deleted' });
    } catch (err) {
        console.error('Error deleting volunteer:', err);
        res.status(500).send('Error deleting volunteer');
    }
});

app.post('/aid-stations/delete', async (req, res) => {
    try {
        const { stationID } = req.body;
        await db.query('DELETE FROM AidStations WHERE stationID=?;', [stationID]);
        res.status(200).json({ message: 'AidStation deleted' });
    } catch (err) {
        console.error('Error deleting aid station:', err);
        res.status(500).send('Error deleting aid station');
    }
});

app.post('/supplies/delete', async (req, res) => {
    try {
        const { supplyID } = req.body;
        await db.query('DELETE FROM Supplies WHERE supplyID=?;', [supplyID]);
        res.status(200).json({ message: 'Supply deleted' });
    } catch (err) {
        console.error('Error deleting supply:', err);
        res.status(500).send('Error deleting supply');
    }
});

app.post('/aid-station-volunteers/remove', async (req, res) => {
    try {
        const { stationVolunteerID } = req.body;
        await db.query('DELETE FROM AidStationVolunteers WHERE stationVolunteerID=?;', [stationVolunteerID]);
        res.status(200).json({ message: 'Volunteer removed from aid station' });
    } catch (err) {
        console.error('Error removing volunteer from aid station:', err);
        res.status(500).send('Error removing volunteer from aid station');
    }
});

app.post('/aid-station-supplies/remove', async (req, res) => {
    try {
        const { stationSupplyID } = req.body;
        await db.query('DELETE FROM AidStationVolunteers WHERE stationVolunteerID=?;', [stationVolunteerID]);
        res.status(200).json({ message: 'Volunteer removed from aid station' });
    } catch (err) {
        console.error('Error removing volunteer from aid station:', err);
        res.status(500).send('Error removing volunteer from aid station');
    }
});


// READ ROUTES
app.get('/races', async (req, res) => {
    try {
        // Query all races
        const query = 'SELECT * FROM Races;';
        const [races] = await db.query(query);

        // Send the results as JSON to the frontend
        res.status(200).json(races);

    } catch (error) {
        console.error("Error fetching races:", error);
        res.status(500).send("An error occurred while fetching races.");
    }
});

app.get('/volunteers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Volunteers;');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching volunteers:', err);
        res.status(500).send('Error fetching volunteers');
    }
});

app.get('/aid-stations', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM AidStations;');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching aid stations:', err);
        res.status(500).send('Error fetching aid stations');
    }
});

app.get('/supplies', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Supplies;');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching supplies:', err);
        res.status(500).send('Error fetching supplies');
    }
});

app.get('/aid-station-volunteers', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                asv.stationVolunteerID,
                asv.stationID,
                a.name AS stationName,
                v.volunteerID,
                v.fname,
                v.lname,
                v.role
            FROM AidStationVolunteers AS asv
            JOIN AidStations AS a ON a.stationID = asv.stationID
            JOIN Volunteers AS v ON v.volunteerID = asv.volunteerID
            ORDER BY a.name, v.lname, v.fname;
            `);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching aid station volunteers:', err);
        res.status(500).send('Error fetching aid station volunteers');
    }
});

app.get('/aid-station-supplies', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM AidStationSupplies;');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching aid station supplies:', err);
        res.status(500).send('Error fetching aid station supplies');
    }
});

// RESET DB
app.post('/reset', async (req, res) => {
    try {
        await db.query('CALL sp_reset_db();');
        console.log('Database reset successfully');
        res.status(200).json({ message: 'Database reset successfully' });
    } catch (error) {
        console.error('Error resetting database:', error);
        res.status(500).send('Failed to reset database');
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});