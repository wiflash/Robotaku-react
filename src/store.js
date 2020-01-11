import createStore from "unistore";


const initialState = {
    isLogin: false,
    category: "all",
    keyword: "",
    isLoading: true
};

export const store = createStore(initialState);

export const actions = store => ({
    handleSetGlobal: (state, event) => {
        event.target.name == null ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
    }
});