import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from "../store";
import Login from "./login";
import {Navbar, Nav, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FaSearch} from "react-icons/fa"
import logo from '../logo.svg';


class Navigation extends Component {
    handleSearch(event) {
        event.preventDefault();
        this.props.history.replace(`/${this.props.category}/result`)
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
        ]
        const selectCategory = categories.map(category => {
            const value = category === "Semua Kategori" ? "all"
                : category === "Aktuator & Power System" ? "actuator"
                : category === "Baterai / Charger" ? "battery"
                : category === "Komponen & Peralatan" ? "component"
                : category === "Robotik & Kit" ? "robotic"
                : category === "UAV / Drone" ? "uav"
                : "ugv"
            return (
                <option value={value} onClick={this.props.handleSetGlobal}>
                    {category}
                </option>
            )
        })
        
        return (
            <Navbar expand="lg" bg="dark">
                <Nav className="mr-auto">
                    <Navbar.Brand href="/">
                        <img src={logo} width="50" height="50" className="d-inline-block align-center" alt="logo"/>
                        <span className="text-light font-weight-bold">Robotaku</span>
                    </Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Form onSubmit={(event) => this.handleSearch(event)} className="mx-auto">
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
                        <Button className="ml-2" variant="outline-warning" onClick={() => this.props.setModal(true)}>
                            Masuk
                        </Button>
                        <Button href="/register" className="ml-2" variant="warning">
                            Daftar
                        </Button>
                        <Login show={this.props.modalShow} onHide={() => this.props.setModal(false)}/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default connect("keyword, category, modalShow", actions)(withRouter(Navigation));