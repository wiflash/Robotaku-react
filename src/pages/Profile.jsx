import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, Button, Tab, Tabs, Card} from "react-bootstrap";
import Navigation from "../components/navbar";
import UserProfileSummary from "../components/userProfileSummary";
import Axios from "axios";


class Profile extends Component {
    state = {
        isLoading: true,
        transactionStatus: "",
        transactionId: 1
    };
    
    requestTransactions = async (inputData) => {
        this.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/user/transaction", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            params: {
                status: inputData.status
            }
        })
        .then((response) => {
            console.log("response:",response.data);
            store.setState({
                transactionLists: response.data,
                isLoading: false
            });
        })
        .catch((error) => {
            if(error.response === undefined) {
                alert("Terdapat kesalahan pada koneksi");
            } else if (error.response.status === 401) {
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                store.setState({modalShow: true});
            } else {
                alert("Terdapat kesalahan pada koneksi");
            }
        });
    };

    requestUserData = async () => {
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/user/profile", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            store.setState({
                userData: response.data,
                isLoading: false
            });
        })
        .catch((error) => {
            if(error.response === undefined) {
                alert("Terdapat kesalahan pada koneksi");
            } else if (error.response.status === 401) {
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                store.setState({modalShow: true});
            } else {
                alert("Terdapat kesalahan pada koneksi");
            }
        });
    };

    componentDidMount = () => {
        this.requestUserData();
        this.requestTransactions(this.state);
    };
    
    handleTransactions = async (event) => {
        console.log("value name:",event.target.name);
        event.target.name === "Semua" ? this.setState({status: ""})
            : event.target.name === "Menunggu Konfirmasi" ? this.setState({status: "waiting"})
            : event.target.name === "Berhasil" ? this.setState({status: "complete"})
            : this.setState({status: "failed"})
        await this.requestTransactions(this.state);
        this.componentDidMount();
    };

    handleSearch = (event) => {
        event.preventDefault();
        this.props.categoryToPathGlobal(store.getState().category);
        this.props.history.push(`/${store.getState().categoryPath}`);
    };

    handleLogin = () => {
        this.props.handleLoginGlobal();
        this.componentDidMount();
    };


    render() {
        const transactionStatus = [
            "Semua", "Menunggu Konfirmasi", "Berhasil", "Ditolak"
        ].map(status => {
            // const isSelected = perPage === store.getState().productPerPage ? true : false
            return (
                <Nav.Item>
                    <Nav.Link className="text-body" eventKey={status}
                        name={status} onClick={this.handleTransactions}
                    >
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
                    <Row className="mt-5">
                        <Col xs="5">
                            {
                                this.props.isLoading === false ? <UserProfileSummary {...this.props}/>
                                    : <p className="text-body">Loading...</p>
                            }
                        </Col>
                        <Col xs="7">
                            <Card>
                                <Card.Header className="bg-warning font-weight-bold">
                                    RIWAYAT TRANSAKSI
                                </Card.Header>
                                <Card.Body>
                                    <Nav fill variant="tabs" defaultActiveKey="Semua">
                                        {transactionStatus}
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


export default connect("isLoading", actions)(withRouter(Profile));