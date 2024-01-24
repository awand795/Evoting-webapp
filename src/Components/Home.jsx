import React from "react";
import { Link } from "react-router-dom";
import gambar from '../Assets/Image/image.jpg'

const Home = () =>{
    return(
        <div>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="index.html">E-Voting</a>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0 disabled">
                
            </form>
            <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ps-5">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item ps-5">
                            <Link className="nav-link" to={"/"}
                            >Quick Count</Link>
                        </li>
                        <li className="nav-item ps-5 pe-5">
                            <Link className="nav-link" to={"/login"}
                            >Login</Link>
                        </li>
                    </ul>
                </div>
        </nav>

        <div className="row pt-3 mt-3">
                <div className="col-sm-6 justify my-auto ps-5 text-start mt-5 pt-5">
                    <h1>
                        Selamat Datang
                    </h1>
                    <p>Di website E-Voting ini kamu dapat memilih kandidat yang kamu inginkan, Silahkan login untuk memilih</p>
                    <Link to="/login" className="btn btn-success">Login Untuk memilih</Link>
                </div>
                <div className="col-sm-6">
                    <img src={gambar} alt="gambar" height="400px" width="400px"/>
                </div>
            </div>
        </div>
    )
}

export default Home