import { useQuery } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PagoListItem = ({ id_pago }) => {
  const { getData } = Conexion;
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData(`pago/${id_pago}/acuerdo/inquilino`)
      .then((data) => {
        setData(data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [getData, id_pago]);

  if (data) {
    console.log(data);
  }

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="bg-red-500 rounded-lg p-2 text-white">
      <h1
        className=" text-xl font-black bg-white text-red-500 p-1 rounded-lg hover:underline hover:cursor-pointer"
        onClick={() => {
          navigate(`inquilinos/${data.ID_INQUILINO}`);
        }}
      >
        {data.NOMBRE} {data.APELLIDO}
      </h1>
      <p>{data.DESCRIPCION}</p>
      <h2 className="font-bold">{data.BALANCE}</h2>
    </div>
  );
};
