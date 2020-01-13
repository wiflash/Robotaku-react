import createStore from "unistore";


const initialState = {
    userData: {},
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    category: "Semua Kategori",
    categoryPath: "all",
    keyword: "",
    modalShow: false,
    isLoading: true,
    isLogin: false,
    emailRegex: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    newEmailRegex: "",
    isValidated: false,
    isEmailExists: false,
    existedEmail: "",
    isPhoneExists: false,
    existedPhone: "",
    page: 1,
    perPage: 12,
    totalEntry: 0,
    searchResult: []
};

export const store = createStore(initialState);

export const actions = store => ({
    handleSetGlobal: (state, event) => {
        event.target.name === undefined ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
        console.log("event.name:", event.target.name);
        console.log("event:", event.target.value);
        // console.log("category:", store.getState().category);
    },
    
    setModal: (state, status) => {
        store.setState({modalShow: status});
    },

    setValidated: (state, status) => {
        store.setState({isValidated: status});
    },

    categoryToPath: (state, category=store.getState().category) => {
        const categoryPath = category === "Semua Kategori" ? "all"
            : category === "Aktuator & Power System" ? "actuator"
            : category === "Baterai / Charger" ? "battery"
            : category === "Komponen & Peralatan" ? "component"
            : category === "Robotik & Kit" ? "robotic"
            : category === "UAV / Drone" ? "uav"
            : "ugv"
        store.setState({categoryPath: categoryPath});
    },

    pathToCategory: (state, path) => {
        const category = path === "all" ? "Semua Kategori"
            : path ===  "actuator" ? "Aktuator & Power System"
            : path === "battery" ? "Baterai / Charger"
            : path === "component" ? "Komponen & Peralatan"
            : path === "robotic" ?"Robotik & Kit"
            : path === "uav" ? "UAV / Drone"
            : "UGV / RC Car"
        store.setState({category: category});
    }
});