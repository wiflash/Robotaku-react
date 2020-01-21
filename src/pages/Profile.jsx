import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, Tab, Tabs, Card} from "react-bootstrap";
import Navigation from "../components/navbar";
import UserProfileSummary from "../components/userProfileSummary";
import Axios from "axios";
import TransactionCard from "../components/transactionCard";


class Profile extends Component {
    state = {
        isLoading: true,
        transactionId: 1
    };
    
    requestTransactions = async () => {
        this.setState({isLoading: true});
        const path = store.getState().transactionStatus !== "" ? `?status=${store.getState().transactionStatus}` : ""
        await Axios.get("https://robotaku.xyz/api/user/transaction"+path, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            store.setState({transactionLists: response.data});
            this.setState({isLoading: false});
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
        await Axios.get("https://robotaku.xyz/api/user/profile", {
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
        this.requestTransactions();
        this.requestUserData();
    };
    
    handleTransactions = async (event) => {
        const status = event.target.name === "Semua" ? store.setState({transactionStatus: ""})
            : event.target.name === "Menunggu Konfirmasi" ? store.setState({transactionStatus: "waiting"})
            : event.target.name === "Berhasil" ? store.setState({transactionStatus: "complete"})
            : store.setState({transactionStatus: "failed"})
        await this.requestTransactions();
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
        const showTransactions = [store.getState().transactionLists].map((eachResult) => {
            return (
                <TransactionCard {...this.props}
                    status={eachResult.status}
                    updatedAt={eachResult.updated_at}
                    id={eachResult.id}
                    totalPrice={eachResult.total_tagihan}
                />
            );
        });

        const transactionStatus = ["Semua", "Menunggu Konfirmasi", "Berhasil", "Dibatalkan"].map((status) => {
            return (
                <Nav.Item>
                    <Nav.Link name={status} eventKey={status} onClick={this.handleTransactions}>{status}</Nav.Link>
                </Nav.Item>
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
                                    <Nav variant="tabs" defaultActiveKey="Semua">
                                        {transactionStatus}
                                    </Nav>
                                    {
                                        this.state.isLoading === false ? showTransactions
                                            : <p className="text-body">Loading...</p>
                                    }
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