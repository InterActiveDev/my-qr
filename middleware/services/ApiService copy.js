import axios from "axios";

const ApiService = {
    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        // axios.defaults.headers.common["Authorization"] = "bearer asasgkjsagiasujas";
    },

//   setHeader() {
//     // axios.defaults.headers.common[
//     //   "Authorization"
//     // ] = `Bearer ${localStorage.getItem("token")}`;

//     axios.defaults.headers.common["Accept"] = "application/json";
//     axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:4000";
//     axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
//   },

//   removeHeader() {
//     delete axios.defaults.headers.common["Authorization"];
//   },

    get(resource) {
        return axios.get(resource);
    },

    post(resource, data) {    
        return axios.post(resource, data);
    },

    put(resource, data) {
        return axios.put(resource, data);
    },

    patch(resource, data) {
        return axios.patch(resource, data);
    },

    delete(resource) {
        return axios.delete(resource);
    },
};

export default ApiService;
