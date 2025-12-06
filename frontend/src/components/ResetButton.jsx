import React from 'react';

const ResetButton = ({ backendURL, refreshData }) => {
    const handleReset = async () => {
        if (!window.confirm("Are you sure you want to reset the database? This cannot be undone.")) return;

        try {
            const response = await fetch(`${backendURL}/reset`, { method: 'POST' });
            if (response.ok) {
                console.log("Database reset successfully.");
                if (refreshData) refreshData();
            } else {
                console.error("Error resetting database.");
            }
        } catch (error) {
            console.error("Error during reset:", error);
        }
    };

    return (
        <button onClick={handleReset}>Reset Database</button>
    );
};

export default ResetButton;