import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Login from "./login";
import {Navbar, Nav, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FaSearch, FaShoppingCart, FaListUl} from "react-icons/fa"
import logo from '../images/arm-logo.png';


class Navigation extends Component {
    handleLogin = (event) => {
        event.preventDefault();
        this.props.handleLogin();
    };

    handleSignOut = () => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        this.props.history.push("/");
    };

    navbarLoginCheck = () => {
        if (localStorage.getItem("isLogin") === "true" && localStorage.getItem("isAdmin") === "false") {
            return (
                <Fragment>
                    <Button onClick={() => this.props.history.push("/profile")}
                        className="ml-lg-2 text-dark font-weight-bold" variant="warning"
                    >
                        Profil
                    </Button>
                    <Button className="ml-lg-2" variant="outline-warning font-weight-bold"
                        onClick={this.handleSignOut}
                    >
                        Keluar
                    </Button>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Button className="ml-lg-2" variant="outline-warning font-weight-bold"
                        onClick={() => this.props.setModalGlobal(true)}
                    >
                        Login
                    </Button>
                    <Button onClick={() => this.props.history.push("/register")}
                        className="ml-lg-2 text-dark font-weight-bold"
                        variant="warning">
                        Daftar
                    </Button>
                </Fragment>
            )
        }
    };

    render() {
        const selectCategory = this.props.categories.map(category => {
            const isSelected = category === store.getState().category ? true : false
            return (
                <option value={category} selected={isSelected} onClick={this.props.handleNavbarSeachGlobal}>
                    {category}
                </option>
            )
        });

        return (
            <Navbar expand="lg" bg="dark">
                <Nav className="mr-auto">
                    <Navbar.Brand href="/">
                        <img src={logo} width="50" height="50" alt="logo" className="d-inline-block mr-2"/>
                        <span className="h4 text-warning font-weight-bold align-middle m-0">RobotAku</span>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle className="border-warning" aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Form onSubmit={(event) => this.props.handleSearch(event)} className="mx-auto">
                        <InputGroup>
                            <InputGroup.Prepend as="select" className="custom-select" style={{maxWidth: "15rem"}}>
                                {selectCategory}
                            </InputGroup.Prepend>
                            <FormControl style={{width: "38vw"}}
                                placeholder="Coba ketik motor" name="keyword"
                                value={this.props.keyword} onChange={this.props.handleNavbarSeachGlobal}
                            />
                            <InputGroup.Append>
                                <Button variant="warning" type="submit">
                                    <FaSearch/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Nav className="mx-auto">
                        <Button onClick={() => localStorage.getItem("isLogin") === "true" ? 
                            this.props.history.push("/cart") : this.props.setModalGlobal(true)}
                            className="ml-lg-2 text-dark font-weight-bold" variant="warning"
                        >
                            <FaShoppingCart/>
                        </Button>
                        <Button onClick={() => localStorage.getItem("isLogin") === "true" ? 
                            this.props.history.push("/transactions") : this.props.setModalGlobal(true)}
                            className="ml-lg-2 text-dark font-weight-bold" variant="warning"
                        >
                            <FaListUl/>
                        </Button>
                    </Nav>
                    <Nav className="ml-auto">
                        {this.navbarLoginCheck()}
                        <Login {...this.props}
                            show={this.props.modalShow}
                            onHide={() => this.props.setModalGlobal(false)}
                            handleLogin={this.handleLogin}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default connect("keyword, modalShow, categories", actions)(withRouter(Navigation));