import mysql2 from "mysql2";
//CAMBIAR ESTO
const pool = mysql2
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "reminder_app",
  })
  .promise();

export async function deleteItems(tabla, valor) {
  try {
    const tablasPermitidas = [
      "INQUILINO",
      "INQUILINO_CONTACTO",
      "PAGO",
      "ACUERDO",
    ];
    if (isNaN(valor)) {
      throw new Error("ID inválido, debe ser un número.");
    }
    if (!tablasPermitidas.includes(tabla)) {
      throw new Error("Tabla no permitida");
    }
    const query = `DELETE FROM ${tabla} WHERE ID = ?`;
    const [result] = await pool.execute(query, [valor]);
    return result;
  } catch (error) {
    console.error("Error al borrar datos:", error.message);
    throw new Error("Error al borrar datos: " + error.message);
  }
}

export async function getItems(tabla, filtro = null, joins = []) {
  try {
    const tablasPermitidas = [
      "INQUILINO",
      "INQUILINO_CONTACTO",
      "PAGO",
      "ACUERDO",
    ];

    // Validar la tabla principal
    if (!tablasPermitidas.includes(tabla)) {
      throw new Error("Tabla no permitida");
    }

    // Construir el query base
    let query = `SELECT * FROM ${tabla}`;
    const params = [];

    // Agregar los JOINs si existen
    if (Array.isArray(joins) && joins.length > 0) {
      const joinClauses = joins.map(({ tablaJoin, on }) => {
        if (!tablasPermitidas.includes(tablaJoin)) {
          throw new Error(`La tabla join ${tablaJoin} no está permitida`);
        }
        if (!on || typeof on !== "string") {
          throw new Error(`La condición ON del JOIN no es válida: ${on}`);
        }
        return `JOIN ${tablaJoin} ON ${on}`;
      });
      query += ` ${joinClauses.join(" ")}`;
    }

    // Agregar filtros si existen
    if (filtro && filtro.columna && filtro.valor) {
      query += ` WHERE ${filtro.columna} = ?`;
      params.push(filtro.valor);
    }

    // Ejecutar la consulta
    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);
    throw new Error("Error al obtener datos de la base de datos");
  }
}

/*export async function getItems(tabla, filtro = null, joins = []) {
  try {
    const tablasPermitidas = [
      "INQUILINO",
      "INQUILINO_CONTACTO",
      "PAGO",
      "ACUERDO",
    ]; // Agrega las tablas válidas
    if (!tablasPermitidas.includes(tabla)) {
      throw new Error("Tabla no permitida");
    }

    if (Array.isArray(joins) && joins.length > 0) {
      const joinClauses = joins.map(({ tablaJoin, on }) => {
        if (!tablasPermitidas.includes(tablaJoin)) {
          throw new Error(`La tabla join ${tablaJoin} no está permitida`);
        }
        if (!on || typeof on !== "string") {
          throw new Error(`La condición ON del JOIN no es válida: ${on}`);
        }
        return `JOIN ${tablaJoin} ON ${on}`;
      });
      query += ` ${joinClauses.join(" ")}`;
    }

    if (filtro && filtro.columna && filtro.valor) {
      query += ` WHERE ${filtro.columna} = ?`;
      params.push(filtro.valor);
    }

    // Ejecutar la consulta
    const [rows] = await pool.query(`SELECT * FROM ${tabla}`);
    return rows;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);

    // Lanzar un error para que el controlador lo maneje
    throw new Error("Error al obtener datos de la base de datos");
  }
}*/

export async function insertItems(tabla, campos, valores) {
  const query = `INSERT INTO ${tabla} (${campos.join(", ")}) VALUES (${campos
    .map(() => "?")
    .join(", ")});`;
  try {
    const [result] = await pool.execute(query, valores);
    return result;
  } catch (error) {
    console.log("Error: " + error);
    throw new Error("Error al insertar en la base de datos");
  }
}

async function modificarItems(tabla, campos, condicion, valores) {
  const query = `UPDATE ${tabla} SET `;
}

/*const INQUILINOS = await getItems("INQUILINO");
//console.log(INQUILINOS[0])
const tabla = "INQUILINO";
const campos = ["NOMBRE", "APELLIDO", "RENTA"];
const valores = ["Sarah", "Pereza", 2000.0];
insertItems(tabla, campos, valores);*/
