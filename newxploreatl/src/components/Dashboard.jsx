import React from "react"
import RegisterForm from "./RegisterForm.jsx";
import Login from './Login.jsx';

const Dashboard = () => {

    return (
      <div className="Dashboard">
          <div>
        <h1>Welcome to XploreATL</h1>
          <RegisterForm />
          <Login />
      </div>
      </div>
    )
  } 
export default Dashboard 