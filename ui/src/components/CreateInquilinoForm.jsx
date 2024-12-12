import { useRef } from "react";
import { InputText } from "./InputText";

export const CreateInquilinoForm = ({ onSubmit }) => {
  const ref = useRef();
  return (
    <form action="" ref={ref} className="flex flex-col gap-2 ">
      <h1 className="text-[var(--main)] text-2xl font-bold underline mb-4">
        Agregar Inquilino
      </h1>
      <div className="flex gap-2 w-full">
        <InputText name={"nombre"} title="Nombre" />
        <InputText name={"apellido"} title="Apellido" />
      </div>
      <InputText name={"direccion"} title="Direccion" />
      <div className="flex gap-2 w-full">
        <InputText name={"renta"} title="Renta" />
        <InputText name={"email"} title="E-Mail" />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onSubmit(ref.current);
        }}
        className="bg-[var(--main)] w-fit text-white px-2 py-1 rounded-md"
      >
        Añadir Inquilino
      </button>
    </form>
  );
};
