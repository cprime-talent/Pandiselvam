import axios from "axios";

const ApiInstance = axios.create();

ApiInstance.interceptors.request.use(
  (config) => {
    if ((config.method === "post" || config.method === "put") && config.data) {
      config.data = handleEmptyValues(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleEmptyValues = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key] !== "" ? obj[key] : "";
    }
  }
  return newObj;
};

export default ApiInstance;
