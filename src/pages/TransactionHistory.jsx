import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, Button, Tab, Tabs} from "react-bootstrap";
import Navigation from "../components/navbar";


class TransactionHistory extends Component {
    handleSearch = (event) => {
        event.preventDefault();
        this.props.categoryToPathGlobal(store.getState().category);
        this.props.history.push(`/${store.getState().categoryPath}`);
    };

    handleLogin = () => {
        this.props.handleLoginGlobal();
    };

    handleSetPerPage = (event) => {
        store.setState({ productPerPage: event.target.value });
        // this.props.requestAllProducts();
    };

    render() {
        const transactionStatus = [
            "Semua", "Menunggu Konfirmasi", "Berhasil", "Ditolak"
        ].map(status => {
            // const isSelected = perPage === store.getState().productPerPage ? true : false
            return (
                <Nav.Item>
                    <Nav.Link className="text-body" eventKey={status}>
                        {status}
                    </Nav.Link>
                </Nav.Item>
            )
        });

        // const showResult = this.props.searchResult.map((eachResult, key) => {
        //     return (
        //         <ProductCard
        //             productName={eachResult.nama}
        //             productId={eachResult.id}
        //             productRating={eachResult.rating}
        //             productPrice={eachResult.harga}
        //         />
        //     );
        // });

        return (
            <Fragment>
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
                <Container>
                    <Row>
                        <Col xs="12" className="mt-5 mx-auto">
                            {/* <Container> */}
                                <Row className="align-items-center">
                                    {/* <span className="h5">
                                        Menampilkan {this.state.keyword === "" ? "semua entri" : ` kata kunci '${this.state.keyword}' `}
                                        {this.state.category === "Semua Kategori" ? "" : ` di kategori ${this.state.category}`}
                                    </span> */}
                                </Row>
                                <Row className="align-items-center rounded">
                                    <Col xs="12">
                                        <Nav fill variant="tabs" defaultActiveKey="Semua">
                                            {transactionStatus}
                                        </Nav>
                                    </Col>
                                </Row>
                                <Row className="align-items-center mx-auto">
                                    {
                                        // this.props.isLoading ?
                                        //     <p className="pr-0 pl-3 text-center font-weight-bold">Loading...</p> 
                                        //     : showResult
                                    }
                                </Row>
                            {/* </Container> */}
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


export default connect("", actions)(withRouter(TransactionHistory));