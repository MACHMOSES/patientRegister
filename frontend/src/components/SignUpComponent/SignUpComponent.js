import { useState } from "react";
import React from "react";
import axios from "axios";

const SingUpComponent = ({ onBackToLogin, onSignupSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      if (!fullName || !username || !email || !password || !role) {
        setError("please fill in all the deatails");
        return;
      }
      if (password !== confirmPassword) {
        // throw new Error("Please enter password that match");
        setError("Please enter password that match");
      }

      const response = await axios.post("http://localhost:8080/signup", {
        fullName,
        username,
        email,
        password,
        confirmPassword,
        role,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.jwt);
      onSignupSuccess(response.data.jwt);
    } catch (error) {
      console.error(
        "Signup failed;",
        error.response ? error.response.data : error.message
      );
      //   setError(error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-5 rounded-3">
      <div
        className="border rounded-lg p-4"
        style={{ width: "500px", height: "auto" }}
      >
        <div>
          <h2 className="mb-4 text-center">Sign Up Page</h2>
          {error && <p className="text-danger">{error}</p>}
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder={"Full Name"}
            value={fullName}
            type="text"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder={"username"}
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder="Email Address"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder="Mobile Number"
            value={phoneNumber}
            type="text"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="mb-4 d-block mx-auto btn-primary"
            style={{ height: "40px", width: "100%" }}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
             className="form-select mb-4"
            style={{ width: "200px", display: "block", margin: "0 auto" }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select Role --</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            className="mb-4 d-block mx-auto fixed-action-btn btn-primary"
            style={{ height: "40px", width: "100%" }}
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <div className="text-center">
            <div>{error && <span style={{ color: "red" }}>{error}</span>}</div>
            <p>
              Already Register?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // stop browser reload
                  onBackToLogin(); //  call parent to show LoginComponent
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpComponent;
