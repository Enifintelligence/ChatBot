import axios from "axios";
const apiUrl =
  //   import.meta.env.VITE_API_BASE_URLX ||
  // || "https://jarvis.enif.ai/";
  // "http://localhost:3009/chat/";
  "https://api.enif.ai/chat/";


const instance = axios.create({
  baseURL: apiUrl,
});
// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("token");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default instance;
