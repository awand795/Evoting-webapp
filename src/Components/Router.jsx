import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "./Nav/SideNav";
import TopNav from "./Nav/TopNav";
import Dashboard from "./Dashboard/Dashboard";
import AuthService from "../Services/auth.service";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Router = () =>{

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState("");

    useEffect(()=>{
        const user = AuthService.getCurrentUser()
        if (!user) {
            navigate('/login')
          }
        else{
            setCurrentUser(user)
        }
          
    },[]);


    return(

        <Routes>
            
        {currentUser && (
            <div id="page-top">
                <div id="wrapper">
                    <SideNav/>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopNav/>
                            <Route path="/dashboard">
                                <Dashboard/>
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Routes>
    )
}

export default Router;