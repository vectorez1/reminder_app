import { InquilinoListItem } from "./InquilinoListItem";

export const InquilinosContainer = ({ isLoading, inquilinos }) => {
  if (isLoading) {
    return <p>Cargando</p>;
  }
  return (
    <>
      <h3 className="text-2xl font-bold underline text-[var(--main)]">
        Inquilinos
      </h3>
      <div className="inquilinos_container gap-2 overflow-auto border-[1px] border-solid border-[var(--main)] p-2 rounded-2xl ">
        {inquilinos.map(({ NOMBRE, APELLIDO, RENTA, DIRECCION, ID }) => {
          return (
            <InquilinoListItem
              nombre={NOMBRE}
              apellido={APELLIDO}
              renta={RENTA}
              direccion={DIRECCION}
              id={ID}
              key={ID}
            />
          );
        })}
      </div>
    </>
  );
};
