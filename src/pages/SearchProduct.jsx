import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, InputGroup, Accordion, Card} from "react-bootstrap";
import Axios from "axios";
import ProductCard from "../components/productCard";
import Navigation from "../components/navbar";


class SearchProduct extends Component {
    requestNews = () => {
        const categoryPath = this.props.match.params.category;
        console.log(categoryPath);
        this.props.pathToCategory(categoryPath);
        const perPage = `&rp=${store.getState().perPage}`;
        const category = `&kategori=${store.getState().category}`;
        console.log(store.getState().category);
        // Axios.get(`http://localhost:5000/api/product/?keyword=${store.getState().keyword}`, {
        //     params: {

        //     }
        // })
        // .then((response) => {

        // })
        // .catch((error) => {

        // })
    }
    
    componentDidMount = () => {
        this.requestNews();
    };
    
    handleSetperPage = (event) => {
        store.setState({ perPage: event.target.value });
        console.log(this.props.perPage);
        this.requestNews();
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
            <Fragment>
                <Navigation {...this.props}/>
                <Container>
                    <Row>
                        <Col xs="12" md="3" className="mt-4">
                            {/* filter bar */}
                        </Col>
                        <Col xs="12" md="9" className="mt-4">
                            <Row className="align-items-center bg-warning rounded-top">
                                <Col xs="4" md="3" lg="2" className="p-2">
                                    <span className="text-right">
                                        Total x produk
                                    </span>
                                </Col>
                                <Col xs="4" md="5" lg="6" className="p-2"></Col>
                                <Col xs="2" lg="2" className="p-2 text-right">
                                    <span>Tampilkan:</span>
                                </Col>
                                <Col xs="2" lg="2" className="p-2">
                                    <select className="custom-select">
                                        {selectPerPage}
                                    </select>
                                </Col>
                            </Row>
                            <Row><ProductCard/></Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}


export default connect("perPage, keyword, category", actions)(withRouter(SearchProduct));