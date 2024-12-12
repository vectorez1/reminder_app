import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import { InquilinosContainer } from "../components/InquilinoContainer";
import { CreateInquilinoForm } from "../components/CreateInquilinoForm";

export const Inquilinos = () => {
  const { getData, postData, createInquilino } = Conexion;
  const queryClient = useQueryClient();

  // Fetch inquilinos
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: () => getData("inquilino"),
  });

  // Mutation for creating a new inquilino
  const mutation = useMutation({
    mutationFn: (formData) => postData("inquilino", createInquilino(formData)),
    onSuccess: (newInquilino) => {
      // Invalidate and refetch inquilinos
      queryClient.invalidateQueries(["inquilinos"]);
    },
    onError: (err) => {
      console.error("Failed to add inquilino:", err);
    },
  });

  const handleSubmit = (formRef) => {
    const formData = {
      nombre: formRef.nombre.value,
      apellido: formRef.apellido.value,
      renta: Number(formRef.renta.value),
      direccion: formRef.direccion.value,
    };
    formRef.reset();

    // Trigger the mutation
    mutation.mutate(formData);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-between h-full gap-4">
      <CreateInquilinoForm onSubmit={handleSubmit} />
      {data && data.length > 0 && <InquilinosContainer inquilinos={data} />}
    </div>
  );
};
