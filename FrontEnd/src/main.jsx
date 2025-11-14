import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Races from './pages/Races/Races.jsx';
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import RaceDetailView from './pages/Races/RaceDetailView.jsx';
import CreateRace from './pages/Races/CreateRace.jsx';
import EditRace from './pages/Races/EditRace.jsx';
import AidStations from './pages/AidStations/AidStations.jsx';
import AidStationDetailView from './pages/AidStations/AidStationDetailView.jsx';
import CreateAidStation from './pages/AidStations/CreateAidStation.jsx';
import EditAidStation from './pages/AidStations/EditAidStation.jsx';
import AidStationVolunteerAssignment from './pages/AidStations/AidStationVolunteerAssignment.jsx';
import AidStationSupplyAssignment from './pages/AidStations/AidStationSupplyAssignment.jsx';
import Volunteers from './pages/Volunteers/Volunteers.jsx';
import CreateVolunteer from './pages/Volunteers/CreateVolunteer.jsx';
import EditVolunteer from './pages/Volunteers/EditVolunteer.jsx';
import Supplies from './pages/Supplies/Supplies.jsx';
import CreateSupplies from './pages/Supplies/CreateSupplies.jsx';
import EditSupplies from './pages/Supplies/EditSupplies.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={App}>
          <Route path='*' Component={NotFound} />
          <Route index Component={HomePage} />

          <Route path='/Races' Component={Races} />
          <Route path='/Races/:raceID' Component={RaceDetailView} />
          <Route path='/Races/Create' Component={CreateRace} />
          <Route path='/Races/Edit/:raceID' Component={EditRace} />

          <Route path='/AidStations' Component={AidStations} />
          <Route path='/AidStations/:stationID' Component={AidStationDetailView} />
          <Route path='/AidStations/:stationID/AddVolunteer' Component={AidStationVolunteerAssignment} />
          <Route path='/AidStations/:stationID/AddSupply' Component={AidStationSupplyAssignment} />
          <Route path='/AidStations/Create' Component={CreateAidStation} />
          <Route path='/AidStations/Edit/:stationID' Component={EditAidStation} />

          <Route path='/Volunteers' Component={Volunteers} />
          <Route path='/Volunteers/Create' Component={CreateVolunteer} />
          <Route path='/Volunteers/Edit/:volunteerID' Component={EditVolunteer} />

          <Route path='/Supplies' Component={Supplies} />
          <Route path='/Supplies/Create' Component={CreateSupplies} />
          <Route path='/Supplies/Edit/:supplyID' Component={EditSupplies} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)