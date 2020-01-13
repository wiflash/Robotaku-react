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
    perPage: 12
};

export const store = createStore(initialState);

export const actions = store => ({
    handleSetGlobal: (state, event) => {
        event.target.name == null ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
    },
    
    setModal: (state, status) => {
        store.setState({modalShow: status});
    },

    setValidated: (state, status) => {
        store.setState({isValidated: status});
    },

    categoryToPath: (state) => {
        const categoryPath = store.getState().category === "Semua Kategori" ? "all"
        : store.getState().category === "Aktuator & Power System" ? "actuator"
        : store.getState().category === "Baterai / Charger" ? "battery"
        : store.getState().category === "Komponen & Peralatan" ? "component"
        : store.getState().category === "Robotik & Kit" ? "robotic"
        : store.getState().category === "UAV / Drone" ? "uav"
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