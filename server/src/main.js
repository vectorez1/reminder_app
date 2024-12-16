import express from "express";
import cors from "cors";
import { getItems, insertItems, deleteItems } from "./database/calldatabase.js";

const server = express();

server.use(express.json());

server.listen(3000);

server.use(cors());

server.get("/", (request, response) => {
  return response.send("<p>hola</p>");
});

//INQUILINO

server.delete("/inquilino", async (request, response) => {
  try {
    const {
      body: { tabla, valor },
    } = request;
    const result = await deleteItems(tabla, valor);
    return response
      .status(200)
      .json({ message: "Datos eliminados correctamente", result });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: "Error al eliminar los datos",
    });
  }
});

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
    return response.json(tabla);
  } catch (error) {
    return response.status(500).json({ error: "Error al obtener los datos" });
  }
});

server.post("/inquilino", async (request, response) => {
  try {
    const {
      body: { nombre, apellido, renta, direccion },
    } = request;
    let id = null;
    /*const data =*/ await insertItems(
      "INQUILINO",
      ["NOMBRE", "APELLIDO", "RENTA", "DIRECCION"],
      [nombre, apellido, renta, direccion]
    )
      .then((resu) => {
        id = resu.insertId;
        console.log(resu.insertId);
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response.status(201).json({
      message: "Inquilino agregado exitosamente",
      data: { id, nombre, apellido, renta, direccion },
    });
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
  try {
    //const { body } = request;
    const {
      body: { email, telefono = null, id_inquilino },
    } = request;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response
        .status(407)
        .json({ message: "Formato de email no válido" });
    }
    await insertItems(
      "INQUILINO_CONTACTO",
      ["EMAIL", "TELEFONO", "ID_INQUILINO"],
      [email, telefono, id_inquilino]
    );
    return response.status(201).json({
      message: "Inquilino_Contacto agregado exitosamente",
      data: { email, telefono, id_inquilino },
    });
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
    const {
      body: { balance, abono = null, id_inquilino, descripcion },
    } = request;
    let id = null;
    await insertItems(
      "ACUERDO",
      ["BALANCE", "ABONO", "ID_INQUILINO", "DESCRIPCION"],
      [balance, abono, id_inquilino, descripcion]
    )
      .then((data) => (id = data.insertId))
      .catch((error) => {
        throw new Error(error);
      });
    return response.status(201).json({
      message: "Acuerdo agregado exitosamente",
      data: { id, balance, abono, id_inquilino, descripcion },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});
//PAGO
//Get acuerdo y inquilino segun el pago
server.get("/pago/:id/acuerdo/inquilino", async (request, response) => {
  try {
    const { id } = request.params;
    const pagoConAcuerdoConInquilino = await getItems(
      "PAGO",
      {
        columna: "PAGO.ID",
        valor: id,
      },
      [
        { tablaJoin: "ACUERDO", on: "PAGO.ID_ACUERDO = ACUERDO.ID" },
        { tablaJoin: "INQUILINO", on: "ACUERDO.ID_INQUILINO = INQUILINO.ID" },
      ]
    );
    response.status(201).json(pagoConAcuerdoConInquilino);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los datos" });
  }
});

// Get pago segun id acuerdo
server.get("/acuerdo/:id/pago", async (request, response) => {
  try {
    const { id } = request.params;
    const pagos = await getItems("PAGO", {
      columna: "ID_ACUERDO",
      valor: id,
    });
    response.status(201).json(pagos);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los datos" });
  }
});
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
      [
        body.cantidad,
        body.fecha,
        body.id_acuerdo,
        (body.esta_pago = false),
        (body.pagado = null),
      ]
    );
    return response
      .status(201)
      .json({ message: "Pago creado exitosamente", body });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Error al insertar los datos" });
  }
});

