import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from "../store";
import {ListGroup, Card, Navbar, Row, Col} from "react-bootstrap";
import profilePicture from "../images/robot-logo.svg";
import { FaUserEdit } from "react-icons/fa";


class UserProfileSummary extends Component {
    render() {
        return (
            <Card>
                <Card.Header className="bg-warning">
                    <Card.Title className="m-0 font-weight-bold">
                        <Row className="align-items-center">
                            <Col xs="8">
                                RINGKASAN PROFIL
                            </Col>
                            <Col xs="4" className="text-right">
                                <FaUserEdit/>
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Navbar.Brand>
                            <img src={profilePicture} width="75" height="75" alt="logo" className="d-inline-block mr-2"/>
                            <span className="font-weight-bold align-middle m-0">
                                {this.props.userData.nama_depan+" "+this.props.userData.nama_belakang}
                            </span>
                        </Navbar.Brand>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Alamat</span><br/>
                        <span className="text-body">{this.props.userData.alamat}, </span>
                        <span className="text-body">Kota {this.props.userData.kota}</span><br/>
                        <span className="text-body">{this.props.userData.provinsi} </span>
                        <span className="text-body">{this.props.userData.kode_pos}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">No. Telepon</span><br/>
                        {this.props.userData.telepon}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="font-weight-bold">Email</span><br/>
                        {this.props.userData.email}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}


export default connect("isLoading, userData", actions)(withRouter(UserProfileSummary));
