import { FormSubmit } from "../components/FormSubmit";
import { Selector } from "../components/Selector";
import { InputText } from "../components/InputText";
import { Conexion } from "../conexion/conexion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const inquilinos = [
  {
    ID: 1,
    NOMBRE: "Pedro",
    APELLIDO: "Godinez",
    RENTA: 2300,
  },
  {
    ID: 2,
    NOMBRE: "Maria",
    APELLIDO: "Fernandez",
    RENTA: 1200,
  },
  {
    ID: 3,
    NOMBRE: "Alberto",
    APELLIDO: "Juanes",
    RENTA: 940,
  },
];

export const Acuerdos = () => {
  const [inquilino, setInquilino] = useState(null);
  const { getData, postData, createInquilino, createInquilinoContacto } =
    Conexion;
  const queryClient = useQueryClient();

  // Fetch inquilinos
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: () => getData("inquilino"),
  });

  return (
    <div className="flex flex-col gap-10">
      <Selector
        items={data && data}
        onItemSelected={(inquilino) => {
          setInquilino(inquilino);
          console.log(inquilino);
        }}
      />
      <FormSubmit>
        <div className="flex gap-2">
          <InputText title="Balance" />
          <InputText title="Balance" />
        </div>
      </FormSubmit>
    </div>
  );
};
