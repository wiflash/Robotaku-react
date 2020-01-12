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
        const perPage = `&rp=${this.props.perPage}`;
        const category = categoryPath === "all" ? "Semua Kategori"
            : categoryPath ===  "actuator" ? "Aktuator & Power System"
            : categoryPath === "battery" ? "Baterai / Charger"
            : categoryPath === "component" ? "Komponen & Peralatan"
            : categoryPath === "robotic" ?"Robotik & Kit"
            : categoryPath === "uav" ? "UAV / Drone"
            : "UGV / RC Car"
        console.log(categoryPath);
        // Axios.get(`http://localhost:5000/api/product/?keyword=${this.props.keyword}`, {
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
                <Navigation/>
                <Container>
                    <Row>
                        <Col xs="12" md="3">
                            {/* filter bar */}
                        </Col>
                        <Col xs="12" md="9">
                            <Row className="align-items-center">
                                <InputGroup>
                                    Tampilkan:
                                    <InputGroup.Append as="select" className="custom-select">
                                        {selectPerPage}
                                    </InputGroup.Append>
                                </InputGroup>
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