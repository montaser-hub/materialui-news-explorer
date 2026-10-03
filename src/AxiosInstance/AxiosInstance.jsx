import axios from "axios";

// Requests go through the Vite proxy (see vite.config.js), which adds the API key.
export const axoinstance = axios.create({
  baseURL: "/newsapi/v2",
});
