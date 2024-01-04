import axios from "axios";

import {BASEURL} from '../Constant/baseUrl'

const AxiosInstance = axios.create({
  baseURL: BASEURL
});

AxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token; // Add a space between 'Bearer' and the token
  }
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default AxiosInstance;