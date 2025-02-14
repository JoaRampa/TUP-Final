import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'lb_stock.db');

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    total REAL NOT NULL,
    tipo TEXT CHECK(tipo IN ('venta', 'ingreso')) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS detalle_transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idTransaccion INTEGER NOT NULL,
    idProduct INTEGER NOT NULL,
    cantidad REAL NOT NULL,
    precio REAL NOT NULL,
    FOREIGN KEY(idTransaccion) REFERENCES transacciones(id),
    FOREIGN KEY(idProduct) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS gastos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT NOT NULL,
    total REAL NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombreProducto TEXT NOT NULL,
    precioRef REAL NOT NULL,
    precioMayorista REAL,
    prodCod TEXT
  );

  CREATE TABLE IF NOT EXISTS list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL
  );
`);

export default db;