import React, { useState } from "react";
import axios from 'axios';


const LoginComponent = ({ onLoginSuccess, onShowSignup }) =>{
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');

        const handleLogin = async () => {
            try{
                if (!username || !password) {
                setError('Please enter both username and password.');
                return;
            }

            const response = await axios.post('http://localhost:8080/signin', { username, password })
                localStorage.setItem('token', response.data.token);
                console.log('Login successful:', response.data);
                onLoginSuccess(response.data.token);
            } catch(error){
                     console.error('Login failed:', error.response ? error.response.data : error.message);
                     setError('Invalid username or password.');


            }
        }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '500px', height: 'auto' }}>
                <h2 className="mb-4 text-center">Login Page</h2>
                <input className="mb-4 d-block mx-auto btn-primary"
                            style={{height: '40px', width: '100%'}} placeholder='Email addr' value={username} type='text' onChange={(e) => setUsername(e.target.value)}/>
                <input className="mb-4 d-block mx-auto btn-primary"
                            style={{height: '40px', width: '100%'}} placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                {error && <p className="text-danger">{error}</p>} {/* Render error message if exists */}

                <button className="mb-4 d-block btn-primary" style={{ height:'50px',width: '100%' }} onClick={handleLogin}>Sign in</button>
                <div className="text-center">
                        <p>Not a member? <a href="#signup" onClick={(e) => {
                            e.preventDefault();  // stop page reload
                            onShowSignup();      // switch to signup
                             }}>Register</a>
                        </p>
                </div>
                
            </div>
        </div>
    );
}

export default LoginComponent;