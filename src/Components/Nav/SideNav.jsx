import React, { useEffect, useState } from "react";
import AuthService from "../../Services/auth.service";
import { Link } from 'react-router-dom'

const SideNav = () => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setIsAdmin(user.roles.includes("ROLE_ADMIN"));
            setIsUser(user.roles.includes("ROLE_USER"));
        }
    }, []);

    const pageSideMenu = [
        { menuName: "Dashboard", link: "/dashboard" }
    ]

    const featuresSideMenu = [
        { menuName: "Suara Pemilih", link: "/suarapemilih" },
        { menuName: "Quick Count", link: "/quickcount" },
        { menuName: "Laporan", link: "/laporan" }
    ]

    const settingSideMenu = [
        { menuName: "Manajemen User", link: "/usermanagement" },
        { menuName: "Settings", link: "/settings" }
    ]

    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">E-Voting</div>
                </a>

                <hr className="sidebar-divider my-0" />

                {isAdmin && (
                    <div>
                        <div className="sidebar-heading">
                            Page
                        </div>

                        {pageSideMenu.map((menu, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={menu.link}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>{menu.menuName}</span></Link>
                            </li>
                        ))}

                        <hr className="sidebar-divider" />

                        <div className="sidebar-heading">
                            Features
                        </div>

                        <li className="nav-item">
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                                <i className="fas fa-fw fa-cog"></i>
                                <span>Master Data</span>
                            </a>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <h6 className="collapse-header">Master Data:</h6>
                                    <Link className="collapse-item" to={"/manajemenuser"}>Data Pemilih</Link>
                                    <Link className="collapse-item" to={"/manajemenkandidat"}>Data Kandidat</Link>
                                </div>
                            </div>
                        </li>

                        {featuresSideMenu.map((menu, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={menu.link}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>{menu.menuName}</span></Link>
                            </li>
                        ))}

                        <hr className="sidebar-divider" />

                        <div className="sidebar-heading">
                            Setting
                        </div>

                        {settingSideMenu.map((menu, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={menu.link}>
                                    <i className="fas fa-fw fa-tachometer-alt"></i>
                                    <span>{menu.menuName}</span></Link>
                            </li>
                        ))}

                        <hr className="sidebar-divider d-none d-md-block" />

                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
                    </div>
                )}

                {isUser && (
                    <div>
                        <div className="sidebar-heading">
                            Menu
                        </div>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>Vote</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quickcount">
                                <i className="fas fa-fw fa-tachometer-alt"></i>
                                <span>quickcount</span></Link>
                        </li>
                    </div>
                )}

            </ul>


        </div>
    )
}

export default SideNav;