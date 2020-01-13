import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card} from "react-bootstrap";
import Axios from "axios";
import ProductCard from "../components/productCard";
import Navigation from "../components/navbar";


class SearchProduct extends Component {
    requestNews = async () => {
        const categoryPath = this.props.match.params.category;
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
        })
        console.log(this.props.searchResult);
        console.log(this.props.isLoading);
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
        });

        const showResult = this.props.searchResult.map((eachResult, key) => {
            console.log(key,eachResult);
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
                <Navigation/>
                <Container>
                    <Row>
                        <Col xs="12" md="3" className="mt-4">
                            filter bar
                        </Col>
                        <Col xs="12" md="9" className="mt-4">
                            <Row className="align-items-center bg-warning rounded-top">
                                <Col xs="4" md="3" lg="2" className="p-2">
                                    <small className="text-right">
                                        Total {this.props.totalEntry} produk
                                    </small>
                                </Col>
                                <Col xs="4" md="5" lg="6" className="p-2"></Col>
                                <Col xs="2" lg="2" className="p-2 text-right">
                                    <small>Tampilkan:</small>
                                </Col>
                                <Col xs="2" lg="2" className="p-2">
                                    <select className="custom-select">
                                        {selectPerPage}
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <CardGroup>
                                    {
                                        this.props.isLoading ?
                                            <p className="text-center font-weight-bold">Loading...</p> 
                                            : showResult
                                    }
                                </CardGroup>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}


export default connect("totalEntry, page, perPage, keyword, category, searchResult, isLoading", actions)(withRouter(SearchProduct));