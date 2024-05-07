import ApiService from './ApiService';
import axios from "axios";

// const baseURL = "http://localhost:4000/api/myorder"; // dev mode
const baseURL = "https://myorderpwa.hungryline.com/api/myorder"; // prod mode

const FetchService = {
  // CRUD
  getData(url) {
    return ApiService.get(baseURL+url);
  },

  createData(url, data, token) {
    return ApiService.post(baseURL+url, data, token);
  },

  updateData(url, data, token) {
    return ApiService.patch(baseURL+url, data, token);
  },

  deleteData(id) {
    return ApiService.delete(`/example/${id}`);
  },

  // AUTH
  login(data) {
    return ApiService.post(baseURL+'/auth/login', data, null);
  },

  syncPos(data, token) {
    const urlSync = "https://cloud.interactive.co.id/myprofit/api/myorder_pwa_send_to_myresto"

    return ApiService.post(urlSync, data, token);
  },

  synchronize(locId){
    return ApiService.get(baseURL+'/qr_restaurant/synchronize/'+locId);
  }
};

export default FetchService;
