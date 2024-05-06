import axios from "axios";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    // setHeader();
  },

  setHeader() {
    // axios.defaults.headers.common["Authorization"] = "Bearer gaksjdnasd";
    axios.defaults.headers.common["Authorization"] =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6Ik1QMDFNMzgxRjIwMTkwNDIzNDkxIiwiZW1haWwiOiJrZXJpcGlrdTEzQGdtYWlsLmNvbSIsImlhdCI6MTcxMTk1ODgwOSwiZXhwIjoxNzEyMDQ1MjA5fQ.VQ7RbQbdGRmyrIb7e9LOgoa5wZYyGSgcOaL5kCxVg5U";
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] =
      "https://myorderpwa.hungryline.com";
    axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
  },

  // removeHeader() {
  //     delete axios.defaults.headers.common["Authorization"];
  // },

  get(resource, token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return axios.get(resource);
  },

  post(resource, data, token) {
    if (token != null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (typeof data == "object") {
      // const newData = JSON.stringify(data);
      return axios.post(resource, data);
    } else {
      const newData = JSON.parse(data);
      return axios.post(resource, newData[0]);
    }
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
