// NPM
import axios from "axios";
// import router from "@/router";
// import NProgress from "nprogress";

// Application
// import { config as $appConfig } from "@/plugins/configPlugin.js";
// import auth from "@/api/auth.js";
import trial from "@/api/trial.js";


/**
 * create axios instance
 */
const _axios = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}`,
});
/**
 * set instance defaults
 */
_axios.defaults.showLoader = true;

_axios.interceptors.request.use(function (request) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
//   NProgress.start();
  return request;
});

_axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // NProgress.done();
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
    //   logout();
    //   router.push({ name: "login" });
    }
    // NProgress.done();
    return Promise.reject(error);
  }
);

/**
 * extend instance with our api endpoints
 */
_axios.api = {
//   Auth: auth(_axios),
  Trial: trial(_axios),
};
/**
 * extend instance with a method to set the auth token.
 * On initial app load, the instance is created before the auth token is set.
 * As a result, all XHR requrest get sent with an empty header. This method allows
 * the post login routine to set the auth token on the instance.
 */
// _axios.api.setAuthToken = (token) => {
//   return (_axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
// };

export default _axios;
