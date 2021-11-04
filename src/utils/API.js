import axios from "axios";

export default axios.create({
  baseURL: "https://api.coincap.io/v2/assets",
  responseType: "json",
  headers: {
    'Content-Type': 'application/json charset=utf-8',
  },

});
