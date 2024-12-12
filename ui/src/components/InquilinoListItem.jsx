import { useNavigate } from "react-router-dom";

export const InquilinoListItem = ({
  nombre = "Victor",
  apellido = "Del Rosario",
  renta = 1200,
  direccion = "c/micasa#112",
  id = 0,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/inquilino/${id}`);
      }}
      className="bg-[var(--main)] text-white rounded-md px-3 py-1 hover:cursor-pointer active:bg-transparent active:border-[2px] active:border-solid active:border-[var(--main)] active:text-[var(--main)] flex flex-col justify-between min-h-[100px]"
    >
      <h3 className="font-black text-2xl underline ">
        {nombre} {apellido}
      </h3>
      {direccion !== "" && <p>{direccion}</p>}
      <h4>{renta}$</h4>
    </div>
  );
};
