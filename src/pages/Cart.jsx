import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import Navigation from "../components/navbar";


class Cart extends Component {
    requestCurrentCart = async () => {
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/user/cart", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response.data);
            // store.setState({
            //     searchResult: response.data.data,
            //     page: response.data.page,
            //     perPage: response.data.per_page,
            //     totalEntry: response.data.total_entry,
            //     isLoading: false
            // });
        })
        .catch((error) => {
            console.log(error);
            alert("Terdapat kesalahan pada koneksi");
        })
        // console.log(this.props.searchResult);
        // console.log(this.props.isLoading);
    }

    componentDidMount = () => {
        this.requestCurrentCart();
    };

    handleRouteSearch(event) {
        event.preventDefault();
        this.props.categoryToPath();
        console.log(store.getState().categoryPath);
        this.props.history.replace(`/${store.getState().categoryPath}`);
    }

    render() {
        return (
            <Fragment>
                <Navigation handleSearch={event => this.handleRouteSearch(event)}/>
                Cart
            </Fragment>
        )
    }
}


export default connect("",actions)(withRouter(Cart));