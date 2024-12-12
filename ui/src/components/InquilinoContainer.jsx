import { InquilinoListItem } from "./InquilinoListItem";

export const InquilinosContainer = ({ inquilinos = [] }) => {
  return (
    <div className="inquilinos_container gap-2 overflow-auto ">
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
  );
};
