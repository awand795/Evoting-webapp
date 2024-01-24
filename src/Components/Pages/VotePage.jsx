import React, { useState, useRef, useEffect } from 'react'
import SideNav from '../Nav/SideNav';
import TopNav from '../Nav/TopNav';
import Pagination from "@material-ui/lab/Pagination";

import VoteService from '../../Services/vote.service';
import KandidatService from '../../Services/kandidat.service';
import UserService from '../../Services/user.service';

const VotePage = () => {

    const form = useRef();

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const [namaUser, setNamaUser] = useState([])
    const [namaKandidat, setNamaKandidat] = useState([])

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const getRequestParams = (searchName, page, pageSize) => {
        let params = {};

        if (searchName) {
            params["name"] = searchName;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    useEffect(()=>{
        async function retreiveUser (){
            const params = getRequestParams(searchName, page, pageSize);
    
            await VoteService.getAllVote(params).then((res) => {
                const { docs, totalPages } = res.data;
    
                setUsers(docs)
                setCount(totalPages)
            })
                .catch((e) => {
                    console.log(e);
                })
        }
        async function retrieveName(){
            const data = await VoteService.getAllVote()
            const data39 = data.data.docs
            for(const item of data39){
                await UserService.getUserById(item.user).then((res)=>{
                    namaUser.push(res.data.data[0].name)
                    console.log(res.data.data[0].name)
                })
                await KandidatService.getKandidatById(item.kandidat).then((res)=>{
                    namaKandidat.push(res.data.data[0].name)
                    console.log(res.data.data[0].name)
                })
            }
        }
        retrieveName()
        retreiveUser()
    },[page],[pageSize])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const formattedDate = (date) =>{
        const dt = new Date(date);
        const yyyy = dt.getFullYear();
        const mm = dt.getMonth()+1;
        const dd = dt.getDate()

        const formmatdate = dd+'/'+mm+'/'+yyyy

        return formmatdate
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <SideNav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopNav />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Data Pemilih</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data Pemilih
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div className="card shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data Pemilih
                                                    </div>

                                                    <div className='row mt-3'>
                                                        <div className='col'>
                                                            {"Items per Page: "}
                                                            <select onChange={handlePageSizeChange} value={pageSize}>
                                                                {pageSizes.map((size) => (
                                                                    <option key={size} value={size}>
                                                                        {size}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='col'>
                                                            <div className='float-right'>
                                                                <div className="input-group mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Search by title"
                                                                        value={searchName}
                                                                        onChange={onChangeSearchName}
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <button
                                                                            className="btn btn-outline-secondary"
                                                                            type="button"
                                                                        >
                                                                            Search
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col'>
                                                            <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Nama Pemilih</th>
                                                                        <th>Kandidat Yang Dipilih</th>
                                                                        <th>Tanggal</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {users && users.map((user,index)=>
                                                                    <tr key={index}>
                                                                        <td>{namaUser[index]}</td>
                                                                        <td>{namaKandidat[index]}</td>
                                                                        <td>{formattedDate(user.createdAt)}</td>
                                                                    </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <Pagination
                                                                className="my-3"
                                                                count={count}
                                                                page={page}
                                                                siblingCount={1}
                                                                boundaryCount={1}
                                                                variant="outlined"
                                                                shape="rounded"
                                                                onChange={handlePageChange}
                                                            />
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
                </div>
            </div>
        </div>
    )
}

export default VotePage;