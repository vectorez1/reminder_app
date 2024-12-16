import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import { Title } from "../components/Title";
import { InputText } from "../components/InputText";
import { useState } from "react";
import { FormSubmit } from "../components/FormSubmit";

export const Inquilino = () => {
  const { id } = useParams();
  const { getData } = Conexion;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`inquilino-${id}`],
    queryFn: () => getData(`inquilino/${id}`),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error}</p>;
  }

  const { NOMBRE, APELLIDO, DIRECCION, RENTA } = data[0];

  return (
    <div className=" flex flex-col gap-5 ">
      <Title />
      <div className="title ">
        <h2 className="text-4xl text-white bg-[var(--main)] w-fit p-3 px-4 rounded-xl ">
          {NOMBRE} {APELLIDO}
        </h2>
      </div>
      <div className="flex flex-col gap-2 ">
        <div>
          <label>Direccion:</label>
          <p className="border-[1px] border-solid border-[var(--main)] px-3 py-1 rounded-lg">
            {DIRECCION}
          </p>
        </div>
        <div>
          <label>Renta:</label>
          <p className="border-[1px] border-solid border-[var(--main)] px-3 py-1 rounded-lg">
            {RENTA}
          </p>
        </div>
      </div>
    </div>
  );
};
