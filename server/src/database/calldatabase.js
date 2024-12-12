import mysql2 from "mysql2";

const pool = mysql2
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "reminder_app",
  })
  .promise();

export async function getItems(tabla) {
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

    // Ejecutar la consulta
    const [rows] = await pool.query(`SELECT * FROM ${tabla}`);
    return rows;
  } catch (error) {
    console.error("Error al obtener datos:", error.message);

    // Lanzar un error para que el controlador lo maneje
    throw new Error("Error al obtener datos de la base de datos");
  }
}

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
