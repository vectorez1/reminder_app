import { useQuery } from "@tanstack/react-query";
import { Conexion } from "../conexion/conexion";
import React, { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { InquilinoListItem } from "../components/InquilinoListItem";
import { InquilinosContainer } from "../components/InquilinoContainer";
import { CreateInquilinoForm } from "../components/CreateInquilinoForm";

export const Inquilinos = () => {
  const { getData } = Conexion;
  const [inquilinos, setInquilinos] = useState([]);
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["inquilinos"],
    queryFn: () => getData("inquilino"),
  });

  useEffect(() => {
    if (data) {
      setInquilinos(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full flex flex-col justify-between h-full gap-4">
      <CreateInquilinoForm />
      {inquilinos.length > 0 ? (
        <InquilinosContainer inquilinos={inquilinos} />
      ) : (
        <div>Done</div>
      )}
    </div>
  );
};
