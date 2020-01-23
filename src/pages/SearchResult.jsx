import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Card} from "react-bootstrap";
import ProductCard from "../components/productCard";
import Navigation from "../components/navbar";
import FilterBar from "../components/filterBar";


class SearchResult extends Component {
    state = {
        category: this.props.category,
        keyword: this.props.keyword
    };

    componentDidMount = (isSearchPage=false) => {
        if(!isSearchPage) {
            const categoryPath = this.props.match.params.category;
            this.props.pathToCategoryGlobal(categoryPath);
        }
        this.props.requestAllProducts();
        this.setState({
            category: this.props.category,
            keyword: this.props.keyword
        })
    }
    
    handleSearch = (event) => {
        if(event !== undefined) {event.preventDefault();}
        this.props.categoryToPathGlobal(store.getState().category);
        this.props.history.push(`/${store.getState().categoryPath}`);
        this.componentDidMount(true);
    };
        
    handleFilterSideBar = async (event) => {
        await this.props.handleFilterSideBarGlobal(event);
        this.handleSearch();
    };
    
    handleSetPerPage = (event) => {
        store.setState({ productPerPage: event.target.value });
        this.props.requestAllProducts();
    };
    
    handleLogin = () => {
        this.props.handleLoginGlobal();
        this.componentDidMount(true);
    };
    
    render() {
        const selectPerPage = [12,24,32,48,60].map(perPage => {
            const isSelected = perPage === store.getState().productPerPage ? true : false
            return (
                <option value={perPage} selected={isSelected} onClick={this.handleSetPerPage}>
                    {perPage}
                </option>
            )
        });

        const showResult = this.props.searchResult.map((eachResult, key) => {
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
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
                <Container fluid>
                    <Row>
                        <Col xs="12" lg="3" className="mt-4">
                            <FilterBar handleFilterSideBar={this.handleFilterSideBar}/>
                        </Col>
                        <Col xs="12" lg="9" className="mt-4 pl-0">
                            {/* <Container> */}
                                <Row className="align-items-center mr-0 ml-3 my-2">
                                    <span className="h5">
                                        Menampilkan {this.state.keyword === "" ? "semua entri" : ` kata kunci '${this.state.keyword}' `}
                                        {this.state.category === "Semua Kategori" ? "" : ` di kategori ${this.state.category}`}
                                    </span>
                                </Row>
                                <Row className="align-items-center bg-warning rounded mr-0 ml-3 mb-3">
                                    <Col xs="4" md="3" lg="2" className="p-2">
                                        <small className="">
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
                                            <p className="pr-0 pl-3 text-center font-weight-bold">Loading...</p> 
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


export default connect("totalEntry, page, perPage, keyword, category, categoryPath, searchResult, isLoading", actions)(withRouter(SearchResult));