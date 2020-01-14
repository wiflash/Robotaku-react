import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {FormControl, Accordion, Card, Nav, InputGroup} from "react-bootstrap";


class SideBarFilter extends Component {
    render () {
        const filterCategory = this.props.categories.map(category => {
            return (
                <Nav.Link className="text-body px-0 py-1">
                    {category}
                </Nav.Link>
            )
        });

        return (
            <Accordion defaultActiveKey="filter">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="filter" className="h-4 bg-warning font-weight-bold">
                        FILTER BERDASARKAN KATEGORI
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="filter">
                        <Card.Body className="p-0">
                            <Accordion defaultActiveKey="">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="category" className="font-weight-bold">
                                        Kategori
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="category">
                                        <Card.Body className="py-2">
                                            {filterCategory}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="price" className="font-weight-bold">
                                        Harga
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="price">
                                        <Card.Body className="py-2">
                                            <InputGroup className="my-1">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Rp</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    placeholder="Harga minimum" name="minPrice"
                                                    onChange={this.props.handleSetGlobal}
                                                />
                                            </InputGroup>
                                            <InputGroup className="my-1">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Rp</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    placeholder="Harga maksimum" name="maxPrice"
                                                    onChange={this.props.handleSetGlobal}
                                                />
                                            </InputGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="rating" className="font-weight-bold">
                                        Rating
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="rating">
                                        <Card.Body className="py-2">
                                        <Nav.Link className="text-body px-0 py-1">
                                            Bintang Satu
                                        </Nav.Link>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion> 
        )
    }
}


export default connect("categories, minPrice, maxPrice", actions)(withRouter(SideBarFilter));