import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Navigation from "../components/navbar";
import SlideShow from "../components/carousel";
import ShopByCategory from "../components/shopByCategory";


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
                <h3 className="mt-5 text-center font-weight-bold">Pilih Berdasarkan Kategori</h3>
                <ShopByCategory className="mt-5"/>
            </Fragment>
        );
    }
}


export default connect("", actions)(withRouter(Home));