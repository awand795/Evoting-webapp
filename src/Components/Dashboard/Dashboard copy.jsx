import React, { useEffect, useState } from "react";

import UserService from "../../Services/user.service";
import KandidatService from "../../Services/kandidat.service";

const Dashboard = () =>{

    const [currentUser, setCurrentUser] = useState(undefined);
    const [allUserLength, setAllUserLength] = useState(0);
    const [allKandidatLength, setAllKandidatLength] = useState(0);
    const [allUserSuccessVote, setAllUserSuccessVote] = useState(0);
    const [allUserNotSuccessVote, setAllUserNotSuccessVote] = useState(0);

    

    useEffect(async ()=>{
        const user = await UserService.getAllUser();
        const data = user.data
        setAllUserLength(data.length);
        const kandidat = await KandidatService.getAllKandidat();
        const data2 = kandidat.data
        setAllKandidatLength(data2.length)
        const userSuccessVote = await UserService.getAllUserByStatus("Sudah Memilih");
        const data3 = userSuccessVote.data
        setAllUserSuccessVote(data3.length)
        const userNotSuccessVote = await UserService.getAllUserByStatus("Belum Memilih");
        const data4 = userNotSuccessVote.data
        setAllUserNotSuccessVote(data4.length)
    },[])

    const menuDashboard =[
        {name:"Jumlah Pemilih",color:"card border-left-primary shadow h-100 py-2",data:allUserLength},
        {name:"Jumlah Kandidat",color:"card border-left-warning shadow h-100 py-2",data:allKandidatLength},
        {name:"Yang Sudah Memilih",color:"card border-left-success shadow h-100 py-2",data:allUserSuccessVote},
        {name:"Yang Belum Memilih",color:"card border-left-danger shadow h-100 py-2",data:allUserNotSuccessVote}
    ]

    return(
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                </div>
                                <div className="row">

                                    {menuDashboard.map((menu,index)=>(
                                        <div className="col-xl-3 col-md-6 mb-4">
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
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
    )
}

export default Dashboard