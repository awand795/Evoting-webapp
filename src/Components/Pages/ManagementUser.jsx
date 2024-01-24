import React, { useEffect, useRef, useState } from "react";
import SideNav from "../Nav/SideNav";
import TopNav from "../Nav/TopNav";
import '../../styles.css';
import { useNavigate } from "react-router-dom";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'

import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import KandidatService from "../../Services/kandidat.service";
import VoteService from '../../Services/vote.service'

const ManagementUser = () => {

    const form = useRef();

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [selectedUserFile, setSelectedUserFile] = useState(undefined)

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (!user) {
            navigate('/login')
        }
        else {
            setCurrentUser(user)
        }

    }, []);

    const onChangeSelectedFiles = (event) =>{
        setSelectedUserFile(event.target.files)
    }

    const onRegisterUser = () =>{

        if(selectedUserFile !== undefined){
            UserService.userFromExcel(selectedUserFile[0]).then(()=>{
                console.log(selectedUserFile[0])
                navigate("/manajemenuser");
                location.reload();
            })
        }
    }

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
                                        <h1 className="h3 mb-0 text-gray-800">Add User From Excel</h1>
                                    </div>

                                    <div className="row">
                                        <div className="col-8 card p-4 m-4">
                                            <div className="card-body">
                                                <div className="form-floating mb-3">
                                                    <Form ref={form} onSubmit={onRegisterUser}>
                                                        <Input className="form-control" type="file"
                                                            name="file"
                                                            onChange={onChangeSelectedFiles}
                                                        />
                                                        <button className="btn btn-primary" onClick={onRegisterUser} type="button">
                                                            Save changes
                                                        </button>
                                                    </Form>
                                                </div>
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

export default ManagementUser