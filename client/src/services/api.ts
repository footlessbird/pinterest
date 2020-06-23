import axios from "axios";

// const host = "http://localhost:5000/api";

/*
export const setToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
*/

/*
export const tokenConfig = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (!token) {
    return;
  }
  config.headers["authorization"] = `Bearer ${token}`;
  return config;
};
*/

export const call = async (method, path, data?, config?) => {
  // const response = await axios[method](`${host}/${path}`, data);

  const response = await axios[method](`/api/${path}`, data, config);
  return response.data;
};

// export default { setToken, call };
export default { call };
