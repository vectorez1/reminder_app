import axios from "axios";

const URL = "https://nmccj9vw-3000.use2.devtunnels.ms";

const server = axios.create({ baseURL: URL });

const createInquilino = ({ nombre, apellido, renta }) => {
  return {
    nombre,
    apellido,
    renta,
  };
};

const createAcuerdo = ({ balance, abono, id_inquilino }) => {
  return {
    balance,
    abono,
    id_inquilino,
  };
};

const createPago = ({
  cantidad,
  fecha,
  id_acuerdo,
  esta_pago,
  pagado = null,
}) => {
  return {
    cantidad,
    fecha,
    id_acuerdo,
    esta_pago,
    pagado,
  };
};

const createInquilinoContacto = ({ email, telefono = null, id_inquilino }) => {
  return {
    email,
    telefono,
    id_inquilino,
  };
};

const getData = async (path) => {
  try {
    const response = server.get(`/${path}`);
    return (await response).data;
  } catch (err) {
    throw new Error("Error Fetching the Data: " + err);
  }
};

const postData = async (path, data) => {
  try {
    const response = server.post(`/${path}`, data);
    console.log("posteando klk");
    return response;
  } catch (err) {
    throw new Error("Error Fetching the Data: " + err);
  }
};

export const Conexion = {
  postData,
  getData,
  createAcuerdo,
  createInquilino,
  createInquilinoContacto,
  createPago,
};
