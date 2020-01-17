import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Tab, Tabs, Card} from "react-bootstrap";
import Navigation from "../components/navbar";
import UserProfileSummary from "../components/userProfileSummary";
import Axios from "axios";
import TransactionCard from "../components/transactionCard";


class Profile extends Component {
    state = {
        isLoading: true,
        transactionStatus: "",
        transactionId: 1
    };
    
    requestTransactions = async (inputData) => {
        store.setState({isLoadingTransaction: true});
        if(inputData.status !== "") {const path = `?status=${inputData.status}`;}
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
            store.setState({
                transactionLists: response.data,
                isLoadingTransaction: false
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
        console.log(this.props.transactionLists);
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
        this.requestTransactions(this.state);
        this.requestUserData();
        console.log(this.props.transactionLists);
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
        const showTransactions = this.props.transactionLists.map((eachResult, key) => {
            return (
                <TransactionCard {...this.props}
                    status={eachResult.status}
                    updatedAt={eachResult.updated_at}
                    id={eachResult.id}
                    totalPrice={eachResult.total_tagihan}
                />
            );
        });

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
                                    <Tabs defaultActiveKey="Semua">
                                        <Tab eventKey="Semua" title="Semua"
                                            name="Semua" onClick={this.handleTransactions}
                                        >
                                            {
                                                this.props.isLoading === false ? showTransactions
                                                    : <p className="text-body">Loading...</p>
                                            }
                                        </Tab>
                                        <Tab eventKey="Menunggu Konfirmasi" title="Menunggu Konfirmasi"
                                            name="Menunggu Konfirmasi" onClick={this.handleTransactions}
                                        >
                                            {
                                                this.props.isLoading === false ? showTransactions
                                                    : <p className="text-body">Loading...</p>
                                            }
                                        </Tab>
                                        <Tab eventKey="Sukses" title="Sukses"
                                            name="Sukses" onClick={this.handleTransactions}
                                        >
                                            {
                                                this.props.isLoading === false ? showTransactions
                                                    : <p className="text-body">Loading...</p>
                                            }
                                        </Tab>
                                        <Tab eventKey="Dibatalkan" title="Dibatalkan"
                                            name="Dibatalkan" onClick={this.handleTransactions}
                                        >
                                            {
                                                this.props.isLoading === false ? showTransactions
                                                    : <p className="text-body">Loading...</p>
                                            }
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


export default connect("isLoading, transactionLists", actions)(withRouter(Profile));