import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

import logo from '../../img/kpi_blue.png';
import "./navbar.css";

const Navbar = () => {

    return (
        <>
            <Nav>
                <NavLink to='/home'>
                    <img id = "logo" src={logo} alt='logo' />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to='/balance'>
                        Energy Balance
                    </NavLink>
                    <span >
                        <NavLink to='/emissions' >
                        Emissions
                    </NavLink>
                    </span>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to='/'>Log out</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};


export default Navbar;