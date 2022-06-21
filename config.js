import axios from "axios";
import { Alert } from "react-native";

const baseURL = "https://api.apilayer.com/fixer/convert?";

axios.defaults.withCredentials = true;

const DefaultHttpOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const getOptions = (headers) => {
  const options = {
    ...DefaultHttpOptions,
    headers: { ...DefaultHttpOptions.headers, ...headers },
  };
  // TODO reading token from local storage and putting it header
  return options;
};

const get = (path, customOptions = {}) => {
  const { headers, ...others } = customOptions;
  const options = getOptions(headers);
  return axios
    .get(baseURL + path, { ...options, ...others })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("=====>", error.response.data);
        return error.response;
      }
    });
};

const httpClients = {
    get
  };
  
  export default httpClients;