import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import Navigation from "../components/navbar";


class Profile extends Component {
    // selalu cek response apakah token valid atau tidak, kalo tidak, login ulang:
    // localStorage.removeItem("isLogin");
    // localStorage.removeItem("token");
    // store.setState({modalShow: true});
    render() {
        return (
            <Fragment>
            </Fragment>
        )
    }
}


export default connect("",actions)(withRouter(Profile));