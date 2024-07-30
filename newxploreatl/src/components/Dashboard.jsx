import React from "react"
import RegisterForm from "./RegisterForm.jsx";
import Login from './Login.jsx';

const Dashboard = ({updateCurrentUser}) => {
    return (
      <div className="Dashboard">
          <div>
        <h1>Welcome to XploreATL</h1>
          <RegisterForm />
          <Login updateCurrentUser={updateCurrentUser}/>
      </div>
      </div>
    )
  } 
export default Dashboard 