// Citation:
// Date: 12/08/2025
// Adapted from: CS340 Exporations/Activities
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2

import React from 'react';
import ResetButton from '../components/ResetButton';

function Home({ backendURL, triggerRefresh }) {
  return (
    <>
      <div className="banner">
        <img
          className="banner-image"
          src="/images/akadake.png"
          alt="A view of Mt. Fuji from above the clouds atop Mt. Akadake."
        />
      </div>

      <div className="homepage-body">
        <h1>Ultramarathon Aid Station Management</h1>

        <div className="homepage-description">
          <h3>Aid Station, Volunteer & Supply Management Tool for Race Planners</h3>
          <p>
            Simplify the logistics of your next event with a centralized platform designed for race directors and planners. Easily 
            manage every detail—from race information and aid station layouts to volunteer assignments and supply 
            tracking. 
          </p>
        </div>

        <ResetButton backendURL={backendURL} refreshData={triggerRefresh} />
      </div>
    </>
  );
}

export default Home;
