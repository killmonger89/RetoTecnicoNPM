// Importar el módulo 'express' para crear un servidor web
const express = require('express');

// Importar el módulo 'body-parser' para parsear los cuerpos de las solicitudes HTTP
const bodyParser = require('body-parser');

// Crear una instancia de la aplicación Express
const app = express();

// Utilizar el middleware 'body-parser' para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Definir la tabla de precios por material
const preciosPorMaterial = {
  '001': 1500.00,
  '002': 1000.00,
  '003': 800.00,
  '004': 500.00,
  '005': 300.00,
  '006': 200.00,
  '007': 100.00,
};

// Definir la función que se ejecutará en Google Cloud Functions
exports.calcularPrestamo = async (req, res) => {
  try {
    // Extraer el ID del material y el peso en gramos de la solicitud
    const { idMaterial, pesoGramos } = req.body;

    // Verificar si el material existe en la tabla de precios
    if (!(idMaterial in preciosPorMaterial)) {
      return res.status(400).json({ error: 'Material no válido' });
    }

    // Calcular el precio por gramo y el monto del préstamo
    const precioGramo = preciosPorMaterial[idMaterial];
    const montoPrestamo = (pesoGramos * precioGramo) * 0.8;

    // Enviar la respuesta con el monto del préstamo calculado
    res.status(200).json({ montoPrestamo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
};
