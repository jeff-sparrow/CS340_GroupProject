import React from 'react';
import ResetButton from '../components/ResetButton';

function Home({ backendURL, triggerRefresh }) {
    return (
        <>
            <h1>Race Management Database</h1>
            <div className="homepageDescription">
                <h2>Welcome to the Race Aid Station Management System!</h2>
                <p>
                    Here you will find pages to view and edit information about races, 
                    aid stations, volunteers, supplies, and specific aid stations assignments.
                </p>
            </div>

            <ResetButton backendURL={backendURL} refreshData={triggerRefresh} />
        </>
    );
}

export default Home;