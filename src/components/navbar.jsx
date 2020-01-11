import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Navbar, Nav, Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import logo from '../logo.svg';


class Navigation extends Component {
    handleAuth = menu => {
        if (menu === "Logout") {
            localStorage.removeItem("isLogin");;
            this.props.history.push("/");
        } else if (menu === "Home") {
            this.props.history.push("/");
        } else {
            this.props.history.push(`/${menu}`)
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push("/:category/result")
    }

    render() {
        const [modalShow, setModalShow] = React.useState(false);

        const auth = localStorage.getItem("isLogin") ? ["Profile", "Logout"]
            : ["Masuk", "Daftar"]
        const authMenu = auth.map(authElement => {
            let categoryPath;
            return (
                <Button className="ml-2" variant="outline-warning" onClick={() => this.handleAuth(authElement)}>
                    {authElement}
                </Button>
            )
        });
        
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
                    <Form onSubmit={(event) => this.handleSubmit(event)} className="mx-auto">
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
                                    Cari
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                    <Nav className="ml-auto">
                        {authMenu}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default connect("keyword, category", actions)(withRouter(Navigation));