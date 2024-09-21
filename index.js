const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Ruta para recibir los mensajes desde Auto Reply
app.post('/whatsapp-webhook', async (req, res) => {
  const { message, userId } = req.body; // Recibir el mensaje y userId desde Auto Reply

  // Enviar el mensaje al webhook de Botpress
  try {
    const response = await axios.post('https://webhook.botpress.cloud/8e3d8c66-9a91-465b-b25d-ed84fd3a9488', {
      message: message,
      userId: userId
    });

    // Enviar la respuesta de Botpress de vuelta
    if (response.data) {
      res.status(200).send(response.data);
    } else {
      res.status(200).send('Message processed');
    }
  } catch (error) {
    console.error('Error enviando mensaje a Botpress:', error);
    res.status(500).send('Error al procesar el mensaje');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
