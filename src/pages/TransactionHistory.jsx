import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
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

    render() {
        return (
            <Fragment>
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
            </Fragment>
        );
    }
}


export default connect("", actions)(withRouter(TransactionHistory));