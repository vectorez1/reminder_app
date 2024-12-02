CREATE DATABASE reminder_app

USE reminder_app

CREATE TABLE INQUILINO(
	ID INT AUTO_INCREMENT,
    NOMBRE VARCHAR(100) NOT NULL,
    APELLIDO VARCHAR(100) NOT NULL,
    RENTA DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(ID)
)
CREATE TABLE INQUILINO_CONTACTO(
	ID INT AUTO_INCREMENT,
    EMAIL VARCHAR(320) NOT NULL,
    TELEFONO VARCHAR(12),
    ID_INQUILINO INT NOT NULL,
    Foreign Key (ID_INQUILINO) REFERENCES INQUILINO(ID)

)
CREATE TABLE PAGO (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    CANTIDAD DECIMAL(10, 2) NOT NULL,
    FECHA DATE NOT NULL,
    ID_ACUERDO INT NOT NULL,
    ESTA_PAGO BOOL NOT NULL,
    PAGADO DECIMAL(10, 2),
    FOREIGN KEY (ID_ACUERDO) REFERENCES ACUERDO(ID)
)

CREATE TABLE ACUERDO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    BALANCE DECIMAL (10,2) NOT NULL,
    ABONO DECIMAL (10,2) NOT NULL,
    ID_INQUILINO INT NOT NULL,
    FOREIGN KEY(ID_INQUILINO) REFERENCES INQUILINO(ID)
)

INSERT INTO INQUILINO (NOMBRE, APELLIDO, RENTA)
VALUES 
('Josue', 'Espinal', 15000.00),
('Victor', 'Gabriel', 12000.00),
('Emmanuel', 'Herrera', 18000.00);

INSERT INTO INQUILINO_CONTACTO (EMAIL, TELEFONO, ID_INQUILINO)
VALUES 
('deriel.espinal@gmail.com', '8096900831', 1),
('victordelrosariogalva@gmail.com', '8298821942', 2),
('emmanuelherrera15@gmail.com', '8095208200', 3);
CREATE VIEW Vista_Inquilinos AS
SELECT ID, NOMBRE, APELLIDO, RENTA
FROM INQUILINO;
CREATE VIEW Vista_Inquilinos_Contacto AS
SELECT ID, EMAIL, TELEFONO, ID_INQUILINO
FROM INQUILINO_CONTACTO;



