import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatsapp-sanjiv-backend.herokuapp.com",
});
export default instance;
