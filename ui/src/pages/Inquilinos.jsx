import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import { InquilinosContainer } from "../components/InquilinoContainer";
import { CreateInquilinoForm } from "../components/CreateInquilinoForm";

export const Inquilinos = () => {
  const { getData, postData, createInquilino, createInquilinoContacto } =
    Conexion;
  const queryClient = useQueryClient();

  // Fetch inquilinos
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: () => getData("inquilino"),
  });

  // Mutation for creating a new inquilino
  const dataMutation = useMutation({
    mutationFn: (formData) => {
      postData("inquilino", createInquilino(formData)).then((response) =>
        postData(
          "inquilino_contacto",
          createInquilinoContacto({
            email: formData.email,
            id_inquilino: response.data.data.id,
          })
        )
      );
    },
    onSuccess: () => {
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
      email: formRef.email.value,
    };
    formRef.reset();

    // Trigger the mutation
    dataMutation.mutate(formData);
  };

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-between h-full gap-4">
      <CreateInquilinoForm onSubmit={handleSubmit} />
      <InquilinosContainer inquilinos={data} isLoading={isLoading} />
    </div>
  );
};
