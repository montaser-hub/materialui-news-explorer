// src/AxiosInstance/axoinstance.js
import axios from "axios";

export const axoinstance = axios.create({
  baseURL: "https://newsapi.org/v2", 
});

axoinstance.interceptors.request.use(
  (request) => {

    request.params = {
      ...request.params,
      apiKey: "dece5083e58448f0b46102b5a95613de",
    };

    return request;
  },
  (err) => Promise.reject(err)
);

axoinstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => Promise.reject(err)
);
