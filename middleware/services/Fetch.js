import ApiService from './ApiService';
import axios from "axios";

// const baseURL = "http://localhost:4000/api/myorder"; // dev mode
const baseURL = "https://myorderpwa.hungryline.com/api/myorder"; // prod mode

const FetchService = {
  // CRUD
  getData(url) {
    return ApiService.get(baseURL+url);
  },

  createDataOld(url, data) {
    return ApiService.post(baseURL+url, data);
  },

  async createData(url, data, timeout = 360000) {
    // default 3 menit
    const source = axios.CancelToken.source();
    const timeoutId = setTimeout(() => {
      source.cancel('The request took too long and was aborted.');
    }, timeout);

    return ApiService.post(baseURL + url, data, source.token)
      .then((result) => {
        clearTimeout(timeoutId); // Clear the timeout if the request is successful
        return result;
      })
      .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        throw error;
      });
  },

  updateData(url, data) {
    return ApiService.patch(baseURL+url, data);
  },

  deleteData(id) {
    return ApiService.delete(`/example/${id}`);
  },

  // AUTH
  login(data) {
    return ApiService.post(baseURL+'/auth/login', data, null);
  },

  syncMyResto(data, token) {
    const urlSync = "https://myprofit.interactiveholic.net/myprofit/api/myorder_pwa_send_to_myresto"
    return ApiService.post(urlSync, data, null, token);
  },

  synchronize(locId){
    return ApiService.get(baseURL+'/qr_myorder/synchronize/'+locId);
  }
};

export default FetchService;
