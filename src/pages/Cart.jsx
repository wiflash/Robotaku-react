import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import Navigation from "../components/navbar";


class Cart extends Component {
    render() {
        return (
            <Fragment>
            </Fragment>
        )
    }
}


export default connect("",actions)(withRouter(Cart));