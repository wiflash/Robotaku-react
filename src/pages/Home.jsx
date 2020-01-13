import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Navigation from "../components/navbar";
import SlideShow from "../components/carousel";
import ShopByCategory from "../components/shopByCategory";


class Home extends Component {
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
                <SlideShow/>
                <h3 className="mt-5 text-center font-weight-bold">Pilih Berdasarkan Kategori</h3>
                <ShopByCategory className="mt-5"/>
            </Fragment>
        );
    }
}


export default connect("", actions)(withRouter(Home));