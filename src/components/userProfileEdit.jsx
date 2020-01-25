import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {ListGroup, Card, Navbar, Row, Col, Form, Button} from "react-bootstrap";


class UserProfileEdit extends Component {
    componentDidMount = () => {
        this.props.requestAllProvinces();
    };

    handleSetAddress = (event, isProvince) => {
        if (isProvince) {
            store.setState({province: event.target.label});
            this.props.requestAllCities(event.target.value);
        } else {
            store.setState({city: event.target.label})
        }
    };

    render() {
        const showAllProvinces = store.getState().provinceList.map(province => {
            return (
                <option value={province.id}
                    label={province.nama}
                    onClick={(event) => this.handleSetAddress(event, true)}
                >
                    {province.nama}
                </option>
            );
        });

        const showAllCities = store.getState().cityList.map(city => {
            return (
                <option value={city.id}
                    label={city.nama}
                    onClick={(event) => this.handleSetAddress(event, false)}
                >
                    {city.nama}
                </option>
            );
        });

        return (
            <Card>
                <Card.Header className="bg-warning">
                    <Card.Title className="m-0 font-weight-bold">
                        <Row className="align-items-center">
                            <Col>
                                EDIT PROFIL
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nama Depan</Form.Label>
                                    <Form.Control name="firstName"
                                        value={this.props.firstName}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nama Belakang</Form.Label>
                                    <Form.Control name="lastName"
                                        value={this.props.lastName}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} xs="12">
                                    <Form.Label>Alamat</Form.Label>
                                    <Form.Control name="address"
                                        value={this.props.address}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                </Form.Group>
                                <Form.Group as={Col} xs="12">
                                    <Form.Label>Provinsi</Form.Label>
                                    <select className="custom-select" required>
                                        {
                                            this.props.isLoadingProvince ?
                                                <option disabled>Pilih provinsi</option>
                                                : showAllProvinces
                                        }
                                    </select>
                                </Form.Group>
                                <Form.Group as={Col} xs="12">
                                    <Form.Label>Kabupaten / Kota</Form.Label>
                                    <select className="custom-select" required>
                                        {
                                            this.props.isLoadingCity ?
                                                <option disabled>Pilih kabupaten / kota</option>
                                                : showAllCities
                                        }
                                    </select>
                                </Form.Group>
                            </Form.Row>
                            <Button block variant="warning" type="submit">
                                Perbaharui
                            </Button>
                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}


export default connect("isLoadingProvince, isLoadingCity", actions)(withRouter(UserProfileEdit));
