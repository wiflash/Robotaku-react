import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Login from "./login";
import {Navbar, Nav, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FaSearch} from "react-icons/fa"
import logo from '../logo.svg';


class Navigation extends Component {
    signOut = () => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("token");
        this.props.history.push("/");
    }

    render() {
        const categories = [
            "Semua Kategori",
            "Aktuator & Power System",
            "Baterai / Charger",
            "Komponen & Peralatan",
            "Robotik & Kit",
            "UAV / Drone",
            "UGV /RC Car"
        ];
        const selectCategory = categories.map(category => {
            return (
                <option value={category} onClick={this.props.handleSetGlobal}>
                    {category}
                </option>
            )
        });

        const LoginCheck = () => {
            if (localStorage.getItem("isLogin") === "true") {
                return (
                    <Fragment>
                        <Button href="/profile" className="ml-md-2 text-dark font-weight-bold" variant="warning">
                            Profil
                        </Button>
                        <Button className="ml-md-2" variant="outline-warning font-weight-bold" onClick={this.signOut}>
                            Keluar
                        </Button>
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        <Button className="ml-md-2" variant="outline-warning font-weight-bold" onClick={() => this.props.setModal(true)}>
                            Masuk
                        </Button>
                        <Button href="/register" className="ml-md-2 text-dark font-weight-bold" variant="warning">
                            Daftar
                        </Button>
                    </Fragment>
                )
            }
        };
        
        return (
            <Navbar expand="lg" bg="dark">
                <Nav className="mr-auto">
                    <Navbar.Brand href="/">
                        <img src={logo} width="50" height="50" alt="logo" className="d-inline-block"/>
                        <span className="h4 text-warning font-weight-bold align-middle m-0">RobotAku</span>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Form onSubmit={(event) => this.props.handleSearch(event)} className="mx-auto">
                        <InputGroup>
                            <InputGroup.Prepend as="select" className="custom-select">
                                {selectCategory}
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Coba ketik motor" name="keyword"
                                value={this.props.keyword} onChange={this.props.handleSetGlobal}
                            />
                            <InputGroup.Append>
                                <Button variant="warning" type="submit">
                                    <FaSearch/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Nav className="ml-auto">
                        <LoginCheck />
                        <Login show={this.props.modalShow} onHide={() => this.props.setModal(false)}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default connect("keyword, modalShow", actions)(withRouter(Navigation));