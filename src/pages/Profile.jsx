import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, ListGroup, Card} from "react-bootstrap";
import Navigation from "../components/navbar";
import UserProfileSummary from "../components/userProfileSummary";
import UserProfileEdit from "../components/userProfileEdit";
import Axios from "axios";
import TransactionCard from "../components/transactionCard";


class Profile extends Component {
    state = {
        isLoading: true,
        isProfileEdit: false,
        page: 1,
        perPage: 5,
        transactionId: 1
    };
    
    requestTransactions = async () => {
        this.setState({isLoading: true});
        const path = store.getState().transactionStatus !== "" ? `?status=${store.getState().transactionStatus}` : ""
        await Axios.get("https://robotaku.xyz/api/user/transaction"+path, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            params: {
                p: this.state.page,
                rp: this.state.perPage
            }
        })
        .then((response) => {
            store.setState({transactionHistory: response.data.transaction});
            this.setState({
                isLoading: false,
                page: response.data.page,
                perPage: response.data.per_page
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
        event.target.name === "Semua" ? store.setState({transactionStatus: ""})
            : event.target.name === "Menunggu Konfirmasi" ? store.setState({transactionStatus: "waiting"})
            : event.target.name === "Selesai" ? store.setState({transactionStatus: "complete"})
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

    toProfileEdit = () => {
        this.props.copyUserData();
        this.props.requestAllProvinces();
        this.setState({isProfileEdit: true});
    };

    handleProfileEdit = async (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     const isValid = this.props.password !== this.props.confirmPassword ? false : form.checkValidity()
    //     if (isValid === false) {
    //         event.stopPropagation();
    //     } else {
            await this.props.handleProfileEditGlobal();
            this.requestUserData();
            this.setState({isProfileEdit: false});
    //     }
    };

    handleSetAddress = (event, isProvince) => {
        if (isProvince) {
            store.setState({province: event.target.label});
            this.props.requestAllCities(event.target.value);
        } else {
            store.setState({city: event.target.label})
        }
    };

    render() {
        const showTransactions = this.props.transactionHistory.map((eachResult, key) => {
            console.log(key, eachResult);
            return (
                <TransactionCard {...this.props}
                    status={eachResult.status}
                    updatedAt={eachResult.updated_at}
                    id={eachResult.id}
                    totalPrice={eachResult.total_tagihan}
                />
            );
        });

        const transactionStatus = ["Semua", "Menunggu Konfirmasi", "Selesai", "Dibatalkan"].map((status) => {
            return (
                <Nav.Item>
                    <Nav.Link name={status} eventKey={status}
                        className="text-body border border-warning m-2"
                        onClick={this.handleTransactions}
                    >
                        {status}
                    </Nav.Link>
                </Nav.Item>
            );
        });

        const showOrEditProfile = () => {
            return (
                this.state.isProfileEdit ?
                    <UserProfileEdit {...this.props}
                        handleProfileEdit={this.handleProfileEdit}
                        handleSetAddress={this.handleSetAddress}
                    />
                    : <UserProfileSummary {...this.props} toProfileEdit={this.toProfileEdit}/>
            );
        };

        return (
            <Fragment>
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
                <Container>
                    <Row className="mt-5">
                        <Col xs="12" lg="5" className="mb-3">
                            {
                                !this.props.isLoading ? showOrEditProfile()
                                    : <p className="text-body">Loading...</p>
                            }
                        </Col>
                        <Col xs="12" lg="7" className="mb-3">
                            <Card>
                                <Card.Header className="bg-warning">
                                    <Card.Title className="font-weight-bold">
                                        RIWAYAT TRANSAKSI
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Nav fill variant="pills" defaultActiveKey="Semua">
                                        {transactionStatus}
                                    </Nav>
                                </Card.Body>
                                <ListGroup variant="flush">
                                    {
                                        this.state.isLoading === false ? showTransactions
                                            : <ListGroup.Item>Loading...</ListGroup.Item>
                                    }
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


export default connect("isLoading, transactionHistory", actions)(withRouter(Profile));