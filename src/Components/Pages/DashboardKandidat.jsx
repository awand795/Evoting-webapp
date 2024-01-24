import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SideNav from '../Nav/SideNav';
import TopNav from '../Nav/TopNav';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from "react-validation/build/button";
import Pagination from "@material-ui/lab/Pagination";

import AuthService from '../../Services/auth.service';
import KandidatServices from '../../Services/kandidat.service';
import UploadService from '../../Services/upload.service';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const DashboardKandidat = () => {

    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [nourut, setNourut] = useState("");
    const [name2, setName2] = useState("");
    const [name, setName] = useState("");
    const [visi, setVisi] = useState("");
    const [misi, setMisi] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [tempUserId, setTempUserId] = useState("")

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [listPhotos,setListPhotos] = useState([])
    const [searchName, setSearchName] = useState("");
    const [selectedFiles, setSelectedFiles] = useState(undefined)

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const pageSizes = [3, 6, 9];

    const onChangeSearchName = (e) => {
        const searchName = e.target.value;
        setSearchName(searchName);
    }

    const onChangeName2 = (e) => {
        const name2 = e.target.value;
        setName2(name2);
    };

    const onChangeNourut = (e) => {
        const nourut = e.target.value;
        setNourut(nourut);
    };

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeVisi = (e) => {
        const visi = e.target.value;
        setVisi(visi);
    };

    const onChangeMisi = (e) => {
        const misi = e.target.value;
        setMisi(misi);
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

        KandidatServices.getAllKandidat(params).then((res) => {
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

    const onChangeSelectedFiles = (event) =>{
        setSelectedFiles(event.target.files)
    }

    const handleRegister = (e) => {
        e.prevent.default();

        setMessage("");
        setLoading(true);

        if(selectedFiles !== undefined){
            UploadService.uploadFile(selectedFiles[0]).then((res)=>{
                const photos = res.data.filename
                const data = {
                    nourut,
                    name,
                    name2,
                    visi,
                    misi,
                    photos
                }
                KandidatServices.createKandidat(data).then(
                    () => {
                        navigate("/manajemenkandidat");
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
            })
        }
        else{
            const data = {
                nourut,
                name,
                name2,
                visi,
                misi,
                photos:"tidak ada"
            }
            KandidatServices.createKandidat(data).then(
            () => {
                navigate("/manajemenkandidat");
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
    }

    const hanldeRegister2 = () => {
        if(selectedFiles !== undefined){
            UploadService.uploadFile(selectedFiles[0]).then((res)=>{
                const photos = res.data.filename
                const data = {
                    nourut,
                    name,
                    name2,
                    visi,
                    misi,
                    photos
                }
                KandidatServices.createKandidat(data).then(
                    () => {
                        navigate("/manajemenkandidat");
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
            })
        }
        else{
            const data = {
                nourut,
                name,
                name2,
                visi,
                misi,
                photos:"tidak ada"
            }
            KandidatServices.createKandidat(data).then(
                () => {
                    navigate("/manajemenkandidat");
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
    }

    const handleEditUser = async () => {
        const dataUser = {
            nourut,
            name,
            name2,
            visi,
            misi
        }
       await KandidatServices.editKandidat(tempUserId,dataUser).then(
            () => {
                navigate("/manajemenuser");
                location.reload();
                setName("")
                setName2("")
                setVisi("")
                setMisi("")
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

    useEffect(()=>{
        ( async function(){
            const useredit = await KandidatServices.getKandidatById(tempUserId);
            const {data} = useredit.data;
            setName(data[0].name)
            setName2(data[0].name2)
            setVisi(data[0].visi)
            setMisi(data[0].misi)
        })();
    },[tempUserId])


    return (
        <div id="page-top">
            <div id="wrapper">
                <SideNav />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopNav />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Data Kandidat</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data Kandidat
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
                                    <div className="card shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Seluruh Data Kandidat
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
                                                                        <th>Gambar</th>
                                                                        <th>Nama Kandidat 1</th>
                                                                        <th>Nama Kandidat 2</th>
                                                                        <th>Visi</th>
                                                                        <th>Misi</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {users.map((user,index)=>
                                                                    <tr key={index}>
                                                                        <td><img src={"http://localhost:8080/files/"+user.photos} alt="gambar" height="150px" width="150px"></img></td>
                                                                        <td>{user.name}</td>
                                                                        <td>{user.name2}</td>
                                                                        <td>{user.visi}</td>
                                                                        <td>{user.misi}</td>
                                                                        <td>
                                                                            <span className='badge badge-warning' data-toggle="modal" data-target="#exampleModal3" onClick={async () => await setTempUserId(user.id)}>Edit</span>   
                                                                            <span className='badge badge-danger' data-toggle="modal" data-target="#exampleModal2" onClick={() => setTempUserId(user.id)}>Hapus</span>
                                                                        </td>
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


            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Tambah Kandidat Baru</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form ref={form} onSubmit={handleRegister}>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="nourut"
                                        value={nourut}
                                        onChange={onChangeNourut}
                                        validations={[required]}
                                    />
                                    <label for="name">No Urut</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="name"
                                        value={name}
                                        onChange={onChangeName}
                                        validations={[required]}
                                    />
                                    <label for="name">Nama Kandidat 1</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="name2"
                                        value={name2}
                                        onChange={onChangeName2}
                                        validations={[required]}
                                    />
                                    <label for="name2">Nama Kandidat 2</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="visi"
                                        value={visi}
                                        onChange={onChangeVisi}
                                        validations={[required]}
                                    />
                                    <label for="visi">Visi</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="misi"
                                        value={misi}
                                        onChange={onChangeMisi}
                                        validations={[required]}
                                    />
                                    <label for="misi">Misi</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="file"
                                        name="file"
                                        onChange={onChangeSelectedFiles}
                                        validations={[required]}
                                    />
                                </div>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={hanldeRegister2}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Hapus User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Anda yakin ingin menghapus user?</h5>
                            <button className="btn btn-warning" data-dismiss="modal">Tidak</button>
                            <button className="btn btn-danger" onClick={() => KandidatServices.deleteKandidat(tempUserId).then(()=> location.reload())}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Form ref={form} onSubmit={handleEditUser}>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="nourut"
                                        value={nourut}
                                        onChange={onChangeNourut}
                                        validations={[required]}
                                    />
                                    <label for="name">No Urut</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="name"
                                        value={name}
                                        onChange={onChangeName}
                                        validations={[required]}
                                    />
                                    <label for="name">Nama Kandidat 1</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="name2"
                                        value={name2}
                                        onChange={onChangeName2}
                                        validations={[required]}
                                    />
                                    <label for="name2">Nama Kandidat 2</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="visi"
                                        value={visi}
                                        onChange={onChangeVisi}
                                        validations={[required]}
                                    />
                                    <label for="visi">Visi</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="text"
                                        name="misi"
                                        value={misi}
                                        onChange={onChangeMisi}
                                        validations={[required]}
                                    />
                                    <label for="misi">Misi</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <Input className="form-control" type="file"
                                        name="file"
                                        onChange={onChangeSelectedFiles}
                                    />
                                </div>
                            </Form>
                        </div>
                        <div className="modal-footer">
                            {message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                            <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary" onClick={handleEditUser}>
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

export default DashboardKandidat;