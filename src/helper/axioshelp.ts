import axios from "axios";

export const apiCallAxios = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });