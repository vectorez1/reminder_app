import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import { useNavigate } from "react-router-dom";

export const AcuerdoListItem = ({ balance, descripcion, id_inquilino }) => {
  const { getData } = Conexion;
  const { data, isLoading } = useQuery({
    queryKey: ["acuerdo"],
    queryFn: () => {
      console.log(id_inquilino);
      return getData(`inquilino/${id_inquilino}`);
    },
  });

  const navigate = useNavigate();

  if (!isLoading) {
    //console.log(data);
  }

  return (
    <div className="bg-red-500 rounded-lg p-2 text-white">
      <h1
        className=" text-xl font-black bg-white text-red-500 p-1 rounded-lg hover:underline hover:cursor-pointer"
        onClick={() => {
          navigate(`inquilinos/${id_inquilino}`);
        }}
      >
        {data ? `${data[0].NOMBRE} ${data[0].APELLIDO}` : "Loading"}
      </h1>
      <p>{descripcion}</p>
      <h2 className="font-bold">{balance}</h2>
    </div>
  );
};
