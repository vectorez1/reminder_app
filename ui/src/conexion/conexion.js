import axios from "axios";

const URL = "https://nmccj9vw-3000.use2.devtunnels.ms";

const server = axios.create({ baseURL: URL });

export const getData = async (path) => {
  try {
    const response = server.get(`/${path}`);
    return (await response).data;
  } catch (err) {
    throw new Error("Error Fetching the Data: " + err);
  }
};
