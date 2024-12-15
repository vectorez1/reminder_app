import { FormSubmit } from "../components/FormSubmit";
import { Selector } from "../components/Selector";
import { InputText } from "../components/InputText";
import { Conexion } from "../conexion/conexion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../components/Button";

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
  const [cantidadPago, setCantidadPago] = useState([]);
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
      <FormSubmit onSubmit={(ref) => console.log(ref)}>
        <div className="flex flex-col gap-2">
          <InputText
            name={"balance"}
            title="Balance"
            value={inquilino ? inquilino.RENTA : ""}
          />
          <div>
            <label htmlFor={"descripcion"}>Descripcion</label>
            <textarea
              name="descripcion"
              id="descripcion"
              placeholder="Escribe.."
              className={`w-full border-[1px]
                border-solid
                border-[var(--main)]
                p-2
                rounded-lg`}
            ></textarea>
            <div>
              <h2 className="text-xl font-bold underline text-[var(--main)] mb-2">
                Pagos
              </h2>
              {/*
                Pagos Tienen:
                -Fecha
                -Cantidad
                -ID_ACUERDO
                -Pagado
              */}
              {cantidadPago.map((_, index) => {
                return (
                  <div key={index} className="pago flex flex-col gap-2">
                    <InputText name={"cantidad"} title="Cantidad" />
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="fecha"
                        className="font-semibold bg-[var(--main)] w-fit rounded-md px-2 text-white flex items-center justify-center text-center "
                      >
                        Fecha
                      </label>
                      <input
                        type="date"
                        id="fecha"
                        placeholder="Cantidad"
                        className="border-[1px] border-[var(--main)] p-2 rounded-lg"
                      />
                    </div>
                  </div>
                );
              })}
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setCantidadPago((prev) => [...prev, []]);
                }}
              >
                Agregar Pago
              </Button>
            </div>
          </div>
        </div>
      </FormSubmit>
    </div>
  );
};
