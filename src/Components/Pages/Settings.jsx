import React, { useEffect, useState } from "react";
import SideNav from "../Nav/SideNav";
import TopNav from "../Nav/TopNav";
import '../../styles.css';
import { useNavigate } from "react-router-dom";

import AuthService from "../../Services/auth.service";
import SettingsService from "../../Services/settings.service";

const Settings = () => {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [settings, setSettings] = useState("");
    const [tempId, setTempId] = useState("");

    const listSettings = ['open','close'];

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (!user) {
            navigate('/login')
        }
        else {
            setCurrentUser(user)
        }

    }, []);

    useEffect(() => {
        async function fetchData() {
            await SettingsService.getSettings().then((res) => {
                const data = res.data
                setSettings(data[0].status)
                setTempId(data[0]._id)
            })
        }
        fetchData()
    }, [])

    const handleEditPageSettings = (event) => {
        setSettings(event.target.value);
    };

    const onSubmitSettings = (e) =>{
        const dataedit = {status:settings}
        SettingsService.editSettings(tempId,dataedit).then((res)=>{
            location.reload()
        })
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
                                        <h1 className="h3 mb-0 text-gray-800">Settings Web</h1>
                                    </div>

                                    <div className="row">
                                        <div className="col-8 card p-4 m-4">
                                            <h1 className="h4 mb-0 text-gray-800 pb-3">Settings Web</h1>
                                            <select onChange={handleEditPageSettings} value={settings}>
                                                {listSettings.map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="pb-3"></div>
                                            <button className="btn btn-primary" type="button" onClick={onSubmitSettings}>Submit</button>
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

export default Settings