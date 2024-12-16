import { useQuery } from "@tanstack/react-query";
import { Title } from "../components/Title";
import { Conexion } from "../conexion/conexion";
import { AcuerdoListItem } from "../components/AcuerdoListItem";

export const Home = () => {
  const { getData } = Conexion;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["acuerdos"],
    queryFn: () => getData("acuerdo"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading) {
    //console.log(data);
  }
  return (
    <div className="flex flex-col gap-5">
      <Title />
      <h1 className="text-xl font-black underline">Acuerdos</h1>
      <div className="grid grid-cols-3 gap-3">
        {data &&
          data.map((acuerdo) => {
            return (
              <AcuerdoListItem
                key={acuerdo.ID}
                balance={acuerdo.BALANCE}
                descripcion={acuerdo.DESCRIPCION}
                id_inquilino={acuerdo.ID_INQUILINO}
              />
            );
          })}
      </div>
    </div>
  );
};
