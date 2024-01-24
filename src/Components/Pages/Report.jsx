import React, { useEffect, useState } from "react";
import SideNav from "../Nav/SideNav";
import TopNav from "../Nav/TopNav";
import '../../styles.css';
import { useNavigate } from "react-router-dom";

import AuthService from "../../Services/auth.service";

const Report = () => {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [linkUser, setLinkUser] = useState("");
    const [linkRekap, setLinkRekap] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (!user) {
            navigate('/login')
        }
        else {
            setCurrentUser(user)
        }

    }, []);

    useEffect(()=>{
        setLinkUser("http://localhost:8080/api/user/excel")
        setLinkRekap("http://localhost:8080/api/vote/excel")
    },[])

    return (
        <div>
            {currentUser && (
                <div id="page-top">
                    <div id="wrapper">
                        <SideNav />
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <TopNav />
                                <div className="container-fluid">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800">Report</h1>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 card p-4 m-4">
                                                <h1 className="h4 mb-0 text-gray-800">Export Data User</h1>
                                            <div className="card-body">
                                                <a href={linkUser} className="btn btn-primary">Download</a>
                                            </div>
                                        </div>
                                        <div className="col-4 card p-4 m-4">
                                                <h1 className="h4 mb-0 text-gray-800">Export Rekap Suara</h1>
                                            <div className="card-body">
                                                <a href={linkRekap} className="btn btn-primary">Download</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Report