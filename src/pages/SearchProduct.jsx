import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Accordion, Card} from "react-bootstrap";
import ProductCard from "../components/productCard";
import Navigation from "../components/navbar";
import FilterBar from "../components/filterBar";


class SearchProduct extends Component {
    componentDidMount = async () => {
        const categoryPath = this.props.match.params.category;
        console.log(categoryPath);
        this.props.pathToCategory(categoryPath);
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/product", {
            params: {
                keyword: store.getState().keyword,
                kategori: store.getState().category === "Semua Kategori" ?
                    "" : store.getState().category,
                rp: store.getState().perPage
            }
        })
        .then((response) => {
            store.setState({
                searchResult: response.data.data,
                page: response.data.page,
                perPage: response.data.per_page,
                totalEntry: response.data.total_entry,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error);
            alert("Terdapat kesalahan pada koneksi");
        });
        // console.log(this.props.searchResult);
        // console.log(this.props.isLoading);
    }
    
    handleSetPerPage = (event) => {
        store.setState({ perPage: event.target.value });
        this.componentDidMount();
    };

    handleRouteSearch = (event) => {
        event.preventDefault();
        this.props.categoryToPath();
        this.props.history.replace(`/${store.getState().categoryPath}`);
        this.componentDidMount();
    };

    handleFilterCategory = () => {
        this.props.categoryToPath();
        this.props.history.replace(`/${store.getState().categoryPath}`);
        this.componentDidMount();
    };

    render() {
        const selectPerPage = [12,24,32,48,60].map(perPage => {
            return (
                <option value={perPage} onClick={this.handleSetPerPage}>
                    {perPage}
                </option>
            )
        });

        const showResult = this.props.searchResult.map((eachResult, key) => {
            // console.log(key,eachResult);
            return (
                <ProductCard
                    productName={eachResult.nama}
                    productId={eachResult.id}
                    productRating={eachResult.rating}
                    productPrice={eachResult.harga}
                />
            );
        });

        return (
            <Fragment>
                <Navigation handleSearch={event => this.handleRouteSearch(event)}/>
                <Container fluid>
                    <Row>
                        <Col xs="12" md="3" className="mt-4">
                            <FilterBar filterCategory={() => this.handleFilterCategory()}/>
                        </Col>
                        <Col xs="12" md="9" className="mt-4">
                            {/* <Container> */}
                                <Row className="align-items-center bg-warning rounded-top mx-auto">
                                    <Col xs="4" md="3" lg="2" className="p-2">
                                        <small className="text-right">
                                            Total {this.props.totalEntry} produk
                                        </small>
                                    </Col>
                                    <Col xs="2" md="4" lg="6" className="p-2"></Col>
                                    <Col xs="3" lg="2" className="p-2 text-right">
                                        <small>Tampilkan:</small>
                                    </Col>
                                    <Col xs="3" md="2" lg="2" className="p-2">
                                        <select className="custom-select">
                                            {selectPerPage}
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="align-items-center mx-auto">
                                    {
                                        this.props.isLoading ?
                                            <p className="text-center font-weight-bold">Loading...</p> 
                                            : showResult
                                    }
                                </Row>
                            {/* </Container> */}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}


export default connect("totalEntry, page, perPage, keyword, category, categoryPath, searchResult, isLoading", actions)(withRouter(SearchProduct));