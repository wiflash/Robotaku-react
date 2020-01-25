import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Navigation from "../components/navbar";
import SlideShow from "../components/carousel";
import ShopByCategory from "../components/shopByCategory";
import { Button, Container, Row, Col } from "react-bootstrap";


class Home extends Component {
    handleSearch = (event) => {
        event.preventDefault();
        this.props.categoryToPathGlobal(store.getState().category);
        this.props.history.push(`/${store.getState().categoryPath}`);
    };

    handleLogin = () => {
        this.props.handleLoginGlobal();
    };

    render() {
        return (
            <Fragment>
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
                <SlideShow/>
                <Container>
                    <Row className="align-items-center">
                        <Col xs="12" className="text-center">
                            <Button className="my-5 font-weight-bold"
                                variant="warning"
                                onClick={() => this.props.history.push("/all")}
                            >
                                LIHAT SEMUA
                            </Button>
                        </Col>
                        <ShopByCategory/>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}


export default connect("", actions)(withRouter(Home));