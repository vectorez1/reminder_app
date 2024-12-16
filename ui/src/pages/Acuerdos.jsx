import { FormSubmit } from "../components/FormSubmit";
import { Selector } from "../components/Selector";
import { InputText } from "../components/InputText";
import { Conexion } from "../conexion/conexion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const { getData, postData, createAcuerdo, createPago } = Conexion;

  // Fetch inquilinos
  const { data } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: () => getData("inquilino"),
  });

  const acuerdoMutation = useMutation({
    mutationFn: ({ balance, descripcion, fecha }) => {
      postData(
        "acuerdo",
        createAcuerdo({
          balance: balance,
          descripcion: descripcion,
          id_inquilino: Number(inquilino.ID),
        })
      ).then((res) => {
        postData(
          "pago",
          createPago({
            cantidad: balance,
            id_acuerdo: res.data.data.id,
            fecha: fecha,
          })
        );
      });
    },
  });

  useEffect(() => {
    //console.log(inquilino);
  }, [inquilino]);
  return (
    <div className="flex flex-col gap-10 ]">
      <Selector
        items={data ? data : inquilinos}
        onItemSelected={(inquilino) => {
          setInquilino(inquilino);
        }}
      />
      <FormSubmit
        onSubmit={(ref) => {
          const { balance, descripcion, fecha } = ref.current;
          acuerdoMutation.mutate({
            balance: balance.value,
            descripcion: descripcion.value,
            fecha: fecha.value,
          });
        }}
      >
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
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fecha"
                className="font-semibold bg-[var(--main)] w-fit rounded-md px-2 text-white flex items-center justify-center text-center"
              >
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                id="fecha"
                className="border-[1px] border-solid border-[var(--main)] rounded-md h-[40px] px-2"
              />
            </div>
          </div>
        </div>
      </FormSubmit>
    </div>
  );
};
