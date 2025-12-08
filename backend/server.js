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
app.post('/races', async (req, res) => {
  try {
    const { name, date, distance, type } = req.body;

    await db.query(`CALL sp_CreateRace(?, ?, ?, ?, @new_id)`, [name, date, distance, type]);
    const [rows] = await db.query(`SELECT @new_id AS raceID`);
    const raceID = rows?.[0]?.raceID;

    res.status(201).json({ raceID });
  } catch (err) {
    console.error('Error creating race via SP:', err);
    res.status(500).send(err.message || 'Error creating race');
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
app.patch('/races/:raceID', async (req, res) => {
  try {
    const { raceID } = req.params;
    const { name, date, distance, type } = req.body;

    await db.query(`CALL sp_UpdateRace(?, ?, ?, ?, ?)`, [
      raceID, name, date, distance, type
    ]);

    res.status(200).json({ message: 'Race updated successfully' });
  } catch (error) {
    console.error('Error updating race:', error);
    res.status(500).send(error.message || 'Error updating race');
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
        // Parse frontend form information
        let data = req.body;

        // Create and execute our query
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL sp_DeleteRace(?);`;
        await db.query(query1, [data.delete_race_id]);

        console.log(`DELETE raceID: ${data.delete_race_id} ` +
            `Name: ${data.delete_race_name}`
        );

        // Redirect the user to the updated webpage data
        res.redirect('/races');
    } catch (error) {
        console.error('Error executing queries:', error);
        // Send a generic error message to the browser
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
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

app.get('/races', async (req, res) => {
  try {
    const query = `
      SELECT
        raceID,
        name,
        DATE_FORMAT(\`date\`, '%Y-%m-%d') AS raceDate,
        distance,
        type
      FROM Races
      ORDER BY raceID;
    `;
    const [races] = await db.query(query);
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
        const query = `
            SELECT
                sta.stationID,
                r.name AS raceName,
                sta.name AS stationName,
                sta.mileMarker,
                sta.elevation,
                sta.latitude,
                sta.longitude
            FROM AidStations as sta
            JOIN Races AS r ON sta.raceID = r.raceID
            ORDER BY r.name, sta.mileMarker
            `;
        const [rows] = await db.query(query);
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
    const [rows] = await db.query(`
      SELECT
        ass.stationSupplyID,
        ass.stationID,
        a.name AS stationName,
        ass.supplyID,
        s.name AS supplyName,
        s.category,
        ass.quantity
      FROM AidStationSupplies AS ass
      JOIN AidStations AS a ON a.stationID = ass.stationID
      JOIN Supplies AS s ON s.supplyID = ass.supplyID
      ORDER BY a.name, s.category, s.name;
    `);
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