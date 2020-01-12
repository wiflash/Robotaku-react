import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, InputGroup, Accordion, Card} from "react-bootstrap";
import ProductCard from "../components/productCard";


class SearchProduct extends Component {
    handleSetperPage = (event) => {
        store.setState({ perPage: event.target.value });
        // do filter search
    };

    render() {
        const selectPerPage = [12,24,32,48,60].map(perPage => {
            return (
                <option value={perPage} onClick={this.handleSetPerPage}>
                    {perPage}
                </option>
            )
        })

        return (
            <Container>
                <Row>
                    <Col xs="12" md="4">
                        {/* filter bar */}
                    </Col>
                    <Col xs="12" md="8">
                        <Row>
                            <InputGroup>
                                Tampilkan:
                                <InputGroup.Append as="select" className="custom-select">
                                    {selectPerPage}
                                </InputGroup.Append>
                            </InputGroup>
                            Pagination
                        </Row>
                        <Row>{ProductCard}</Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default connect("perPage, keyword, category", actions)(withRouter(SearchProduct));