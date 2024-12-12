import express from "express";
import { getItems, insertItems } from "./database/calldatabase.js";

const server = express();

server.use(express.json());

server.listen(3000);

server.get("/", (request, response) => {
  return response.send("<p>hola</p>");
});

//INQUILINO

server.get("/inquilino", async (request, response) => {
  try {
    const tabla = await getItems("INQUILINO");
    const { filtro, valor } = request.query;
    if (filtro && valor) {
      const resultadoFiltrado = tabla.filter((inquilino) =>
        inquilino[filtro]?.toString().includes(valor)
      );

      return response.json(resultadoFiltrado);
    }
    console.log(request.query);
    console.log(tabla);
    return response.json(tabla);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});

server.post("/inquilino", async (request, response) => {
  try {
    const { body } = request;

    const data = await insertItems(
      "INQUILINO",
      ["NOMBRE", "APELLIDO", "RENTA"],
      [body.nombre, body.apellido, body.renta]
    );
    console.log(data);
    return response
      .status(201)
      .json({ message: "Inquilino agregado exitosamente" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});

server.get("/inquilino/:id", async (request, response) => {
  try {
    // Convertir el parámetro id a número
    const id = Number(request.params.id);

    // Validar que el id es un número válido
    if (isNaN(id)) {
      return response.status(400).json({ error: "ID inválido" });
    }

    // Obtener los datos de la tabla
    const tabla = await getItems("INQUILINO");
    //console.log("Datos de tabla:", tabla);
    //console.log("ID proporcionado:", id);

    // Filtrar los resultados
    const resultado = tabla.filter((item) => item.ID === id);

    // Manejar el caso donde no se encuentran resultados
    if (resultado.length === 0) {
      return response.status(404).json({ error: "Inquilino no encontrado" });
    }

    // Retornar los datos filtrados
    return response.json(resultado);
  } catch (error) {
    console.error("Error en el servidor:", error);
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});
//INQUILINO_CONTACTO
server.get("/inquilino_contacto", async (request, response) => {
  try {
    const tabla = await getItems("INQUILINO_CONTACTO");
    console.log(tabla);
    return response.json(tabla);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});

server.post("/inquilino_contacto", async (request, response) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  try {
    const { body } = request;
    if (!emailRegex.test(body.email)){
      return response
      .status(407)
      .json({message: "Formato de email no válido"})
    }
    await insertItems(
      "INQUILINO_CONTACTO",
      ["EMAIL", "TELEFONO", "ID_INQUILINO"],
      [body.email, body.telefono, body.id_inquilino]
    );
    return response
      .status(201)
      .json({ message: "Inquilino_Contacto agregado exitosamente" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});
//ACUERDO

server.get("/acuerdo", async (request, response) => {
  try {
    const tabla = await getItems("ACUERDO");
    console.log(tabla);
    return response.json(tabla);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});

server.post("/acuerdo", async (request, response) => {
  try {
    const { body } = request;
    await insertItems(
      "ACUERDO",
      ["BALANCE", "ABONO", "ID_INQUILINO"],
      [body.balance, body.abono, body.id_inquilino]
    );
    return response
      .status(201)
      .json({ message: "Acuerdo agregado exitosamente" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});
//PAGO

server.get("/pago", async (request, response) => {
  try {
    const tabla = await getItems("PAGO");
    console.log(tabla);
    return response.json(tabla);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});

server.post("/pago", async (request, response) => {
  try {
    const { body } = request;
    await insertItems(
      "PAGO",
      ["CANTIDAD", "FECHA", "ID_ACUERDO", "ESTA_PAGO", "PAGADO"],
      [body.cantidad, body.fecha, body.id_acuerdo, body.esta_pago, body.pagado]
    );
    return response.status(201).json({ message: "Pago creado exitosamente" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});
