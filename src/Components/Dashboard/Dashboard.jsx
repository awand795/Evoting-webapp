import React, { useEffect, useState } from "react";
import SideNav from "../Nav/SideNav";
import TopNav from "../Nav/TopNav";
import '../../styles.css';
import { useNavigate } from "react-router-dom";

import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import KandidatService from "../../Services/kandidat.service";
import VoteService from '../../Services/vote.service'
import SettingsService from "../../Services/settings.service";

const Dashboard = () => {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [allUserLength, setAllUserLength] = useState(0);
    const [allKandidatLength, setAllKandidatLength] = useState(0);
    const [kandidatData, setKandidatData] = useState([]);
    const [allUserSuccessVote, setAllUserSuccessVote] = useState(0);
    const [allUserNotSuccessVote, setAllUserNotSuccessVote] = useState(0);
    const [perolehanSuara, setPerolehanSuara] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [statusPilih, setStatusPilih] = useState(false)
    const [webStatus, setWebStatus] = useState(false)

    useEffect(() => {
        const user = AuthService.getCurrentUser()
        if (!user) {
            navigate('/login')
        }
        else {
            setCurrentUser(user)
            setIsAdmin(user.roles.includes("ROLE_ADMIN"));
            setIsUser(user.roles.includes("ROLE_USER"));
        }

    }, []);

    useEffect(() => {
        async function fetchData() {
            const user = await UserService.getAllUser();
            const data = user.data
            setAllUserLength(data.totalDocs);
            const kandidat = await KandidatService.getAllKandidat();
            const data2 = kandidat.data
            const data39 = data2.docs
            for (const item of data39) {
                await VoteService.getVote(item.id).then((res) => {
                    perolehanSuara.push(res.data.length)
                    const suara = res.data.length
                })
            }
            setKandidatData(data39)
            setAllKandidatLength(data2.totalDocs)
            const userSuccessVote = await UserService.getAllUserByStatus("Sudah Memilih");
            const data3 = userSuccessVote.data
            setAllUserSuccessVote(data3.length)
            const userNotSuccessVote = await UserService.getAllUserByStatus("Belum Memilih");
            const data4 = userNotSuccessVote.data
            setAllUserNotSuccessVote(data4.length)
        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchUser() {
            const datauserku = await UserService.getUserById(currentUser.id)
            const statusnya = datauserku.data.data[0].status
            setStatusPilih(statusnya === "Sudah Memilih")
            const datawebnya = await SettingsService.getSettings()
            const statuswebnya = datawebnya.data[0].status
            setWebStatus(statuswebnya === "open")
        }
        fetchUser()
    }, [currentUser])

    const menuDashboard = [
        { name: "Jumlah Pemilih", color: "card border-left-primary shadow h-100 py-2", data: allUserLength },
        { name: "Jumlah Kandidat", color: "card border-left-warning shadow h-100 py-2", data: allKandidatLength },
        { name: "Yang Sudah Memilih", color: "card border-left-success shadow h-100 py-2", data: allUserSuccessVote },
        { name: "Yang Belum Memilih", color: "card border-left-danger shadow h-100 py-2", data: allUserNotSuccessVote }
    ]

    const voteOnClick = async (id) => {
        const data = { status: "Sudah Memilih" }
        await UserService.editUser(currentUser.id, data).then(async () => {
            const datapilih = { user: currentUser.id, kandidat: id }
            await VoteService.createVote(datapilih).then(() => {
                location.reload()
            })
        })
    }

    return (
        <div>
            {isAdmin && (
                <div id="page-top">
                    <div id="wrapper">
                        <SideNav />
                        <div id="content-wrapper" className="d-flex flex-column">
                            <div id="content">
                                <TopNav />
                                <div className="container-fluid">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                    </div>
                                    <div className="row">

                                        {menuDashboard.map((menu, index) => (
                                            <div className="col-xl-3 col-md-6 mb-4" key={index}>
                                                <div className={menu.color}>
                                                    <div className="card-body">
                                                        <div className="row no-gutters align-items-center">
                                                            <div className="col mr-2">
                                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                    {menu.name}</div>
                                                                <div className="h5 mb-0 font-weight-bold text-gray-800">{menu.data}</div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card shadow h-100 py-2">
                                                <div className="card-body">
                                                    <div className="row no-gutters align-items-center">
                                                        <div className="col mr-2">
                                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                                Suara yang diperoleh Kandidat
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {kandidatData.map((data, index) => (
                                                        <div className="col mr-2" key={index}>
                                                            <div className="text-xs font-weight-bold text-uppercase mb-1">
                                                                {data.name} dan {data.name2} <div className="float-right">{perolehanSuara[index]} dari {allUserSuccessVote}</div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar" role="progressbar" style={{ width: (parseInt(perolehanSuara[index]) / parseInt(allUserSuccessVote)) * 100 }} aria-valuenow={(parseInt(perolehanSuara[index]) / parseInt(allUserSuccessVote)) * 100} aria-valuemin="0" aria-valuemax="100">{(parseInt(perolehanSuara[index]) / parseInt(allUserSuccessVote)) * 100}%</div>
                                                            </div>
                                                        </div>
                                                    ))}
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
            {isUser && (
                <div>
                    {webStatus ? (
                        <div>
                            {statusPilih ? (
                                <div>
                                    <div id="page-top">
                                        <div id="wrapper">
                                            <SideNav />
                                            <div id="content-wrapper" className="d-flex flex-column">
                                                <div id="content">
                                                    <TopNav />
                                                    <div className="container-fluid">
                                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                            <h1 className="h3 mb-0 text-gray-800">You Has Vote</h1>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div class="alert alert-success" role="alert">
                                                                    <h4 class="alert-heading">Well done!</h4>
                                                                    <p>Aww yeah, you successfully vote this. you can logout now, or you can checking the result of voting, in the side navigation, click quick count to check the result.</p>
                                                                    <hr></hr>
                                                                    <p class="mb-0">Thanks for the vote, sayonara!.</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div id="page-top">
                                        <div id="wrapper">
                                            <SideNav />
                                            <div id="content-wrapper" className="d-flex flex-column">
                                                <div id="content">
                                                    <TopNav />
                                                    <div className="container-fluid">
                                                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                            <h1 className="h3 mb-0 text-gray-800">Vote Now</h1>
                                                        </div>
                                                        <div className="row">
                                                            {kandidatData && kandidatData.map((item, index) => (
                                                                <div className="col-6" key={index}>
                                                                    <div className="card p-3">
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <h5>Kandidat No Urut {index + 1}</h5>
                                                                                <div className="text">Nama : {item.name + " & " + item.name2}</div>
                                                                                <div className="text">Visi : {item.visi}</div>
                                                                                <div className="text">Misi : {item.misi}</div>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <img src={"http://localhost:8080/files/" + item.photos} alt="gambar" height="150px" width="150px"></img>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-4">
                                                                                <button type="button" className="btn btn-primary" onClick={() => voteOnClick(item.id)}>Vote</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div id="page-top">
                                    <div id="wrapper">
                                        <SideNav />
                                        <div id="content-wrapper" className="d-flex flex-column">
                                            <div id="content">
                                                <TopNav />
                                                <div className="container-fluid">
                                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                                        <h1 className="h3 mb-0 text-gray-800">Vote Has Closed </h1>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div class="alert alert-success" role="alert">
                                                                <h4 class="alert-heading">Well done!</h4>
                                                                <p>Aww yeah, vote has been closed. you can logout now, or you can checking the result of voting, in the side navigation, click quick count to check the result.</p>
                                                                <hr></hr>
                                                                <p class="mb-0">Thanks for the vote, sayonara!.</p>
                                                            </div>
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
            )}
        </div>
    )
}

export default Dashboard