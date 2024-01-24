import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideNav from '../../Nav/SideNav';
import TopNav from '../../Nav/TopNav';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from "react-validation/build/button";
import Pagination from "@material-ui/lab/Pagination";

import AuthService from '../../../Services/auth.service';
import UserService from '../../../Services/user.service';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const DashboardUser = () => {

    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

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

    const retreiveUser = () => {
        const params = getRequestParams(searchName, page, pageSize);

        UserService.getAllUserPaginate(params).then((res) => {
            const { docs, totalPages } = res.data;

            setUsers(docs)
            setCount(totalPages)
        })
            .catch((e) => {
                console.log(e);
            })
    }

    useEffect(retreiveUser, [page, pageSize])

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const handleRegister = (e) => {
        e.prevent.default();

        setMessage("");
        setLoading(true);


        AuthService.register(name, username, email, password).then(
            () => {
                navigate("/manajemenuser");
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        )

    }

    const hanldeRegister2 = () => {
        AuthService.register(name, username, email, password).then(
            () => {
                navigate("/manajemenuser");
                location.reload();
            },
            (error) => {
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        )
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <SideNav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopNav />
                        <div className="container-fluid">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Data Pemilih</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div class="card shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data User
                                                        <button className='btn btn-primary text-right float-right' data-toggle="modal" data-target="#exampleModal">Tambah</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <div class="card shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data User
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
                                                                        <th>No</th>
                                                                        <th>Nama</th>
                                                                        <th>Username</th>
                                                                        <th>Email</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {users.map((user,index)=>
                                                                    <tr>
                                                                        <td>{index+1}</td>
                                                                        <td>{user.name}</td>
                                                                        <td>{user.username}</td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.status}</td>
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


            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Tambah User Baru</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <Form ref={form} onSubmit={handleRegister}>
                                <div class="form-floating mb-3">
                                    <Input class="form-control" type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={onChangeName}
                                        validations={[required]}
                                    />
                                    <label for="name">Nama</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <Input class="form-control" type="text"
                                        name="username"
                                        id="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required]}
                                    />
                                    <label for="username">Username</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <Input class="form-control" type="text"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required]}
                                    />
                                    <label for="email">Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <Input class="form-control" type="text"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                    />
                                    <label for="password">Password</label>
                                </div>
                            </Form>
                        </div>
                        <div class="modal-footer">
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <button class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button class="btn btn-primary" onClick={hanldeRegister2}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardUser;