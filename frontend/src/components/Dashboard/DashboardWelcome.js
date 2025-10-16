import React from "react";

const DashboardWelcome = () =>{
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{width: '500px', height: '400px'}}>
                <h2 className="mb-4 text-center">Welcome to Dashboard</h2>
                <p className="mb-4 text-center">Hello,!</p>
                <p className="text-center">You are logged in successfully.</p>
            </div>
        </div>
    );
}

export default DashboardWelcome;