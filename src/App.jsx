import React, {Component} from "react";
import {store} from "./store";
import { Provider } from "unistore/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import SearchProduct from "./pages/SearchProduct";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/register" component={Register}/>
                        <Route path="/:category/result" component={SearchProduct}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}


export default App;