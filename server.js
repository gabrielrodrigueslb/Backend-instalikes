// Importa o módulo Express para criar o servidor web
import express from 'express'; 
import routes from './src/routes/postsRoutes.js';

const app = express(); // Cria uma nova aplicação Express
routes(app)

app.listen(3000, () => {
  console.log('Servidor escutando'); // Inicia o servidor na porta 3000 e imprime uma mensagem no console
});
