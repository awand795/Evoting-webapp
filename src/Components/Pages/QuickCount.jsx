import React, { useEffect, useState } from "react";
import SideNav from "../Nav/SideNav";
import TopNav from "../Nav/TopNav";
import '../../styles.css';
import { useNavigate } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import AuthService from "../../Services/auth.service";
import UserService from "../../Services/user.service";
import KandidatService from "../../Services/kandidat.service";
import VoteService from '../../Services/vote.service'
ChartJS.register(ArcElement, Tooltip, Legend);

const QuickCount = () => {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(undefined);
    const [allUserLength, setAllUserLength] = useState(0);
    const [allKandidatLength, setAllKandidatLength] = useState(0);
    const [kandidatData, setKandidatData] = useState([]);
    const [allUserSuccessVote, setAllUserSuccessVote] = useState(0);
    const [allUserNotSuccessVote, setAllUserNotSuccessVote] = useState(0);
    const [perolehanSuara, setPerolehanSuara] = useState([])
    const [namaKandidat, setNamaKandidat] = useState([])

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
                namaKandidat.push(item.name)
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

    const doughnoutdata = {
        labels: namaKandidat,
        datasets: [
            {
                label: 'Jumlah Pemilih',
                data: perolehanSuara,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            }
        ]
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
                                        <h1 className="h3 mb-0 text-gray-800">Quick Count</h1>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Nama Kandidat</th>
                                                        <th>Jumlah Pemilih</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {kandidatData && kandidatData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.name+" & "+item.name2}</td>
                                                            <td>{perolehanSuara[index]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <table width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th> <h1 className="h3 mb-0 text-gray-800">Jumlah Seluruh Pemilih</h1></th>
                                                        <th>{allUserLength} Orang</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-8">
                                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Jumlah Suara Sah</th>
                                                        <td>{(parseInt(allUserSuccessVote) / parseInt(allUserLength)) * 100}% ({allUserSuccessVote} orang)</td>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>Jumlah Suara Tidak Digunakan</th>
                                                        <td>{(parseInt(allUserNotSuccessVote) / parseInt(allUserLength)) * 100}% ({allUserNotSuccessVote} orang)</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-4">
                                            <Doughnut data={doughnoutdata} />
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

export default QuickCount