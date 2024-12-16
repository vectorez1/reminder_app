import { useQuery } from "@tanstack/react-query";
import { Title } from "../components/Title";
import { Conexion } from "../conexion/conexion";
import { AcuerdoListItem } from "../components/AcuerdoListItem";
import { PagoListItem } from "../components/PagoListItem";

export const Home = () => {
  const { getData } = Conexion;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pago"],
    queryFn: () => getData("pago"),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading) {
    console.log(data);
  }
  return (
    <div className="flex flex-col gap-5">
      <Title />
      <h1 className="text-xl font-black underline">Recordatorios</h1>
      <div className="grid grid-cols-3 gap-3">
        {data &&
          data.map((pago) => {
            return (
              <PagoListItem key={Number(pago.ID)} id_pago={Number(pago.ID)} />
            );
          })}
      </div>
    </div>
  );
};
