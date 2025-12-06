import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Races from './pages/Races';
import AidStations from './pages/AidStations';
import Volunteers from './pages/Volunteers';
import Supplies from './pages/Supplies';

// Components
import Navigation from './components/Navigation';

const backendPort = 1775; 
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home backendURL={backendURL} />} />
                <Route path="/races" element={<Races backendURL={backendURL} />} />
                <Route path="/aid-stations" element={<AidStations backendURL={backendURL} />} />
                <Route path="/volunteers" element={<Volunteers backendURL={backendURL} />} />
                <Route path="/supplies" element={<Supplies backendURL={backendURL} />} />
            </Routes>
        </>
    );
}

export default App;
