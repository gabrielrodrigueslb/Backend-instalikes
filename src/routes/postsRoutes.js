// Importa o módulo express para gerenciar as rotas e o servidor
import express from "express";
// Importa o multer para gerenciar o upload de arquivos (imagens no caso)
import multer from "multer";
// Importa as funções do controller responsáveis pelas operações com posts
import { listarPosts, postarNovoPost, uploadImagem } from "../controller/postsController.js";

// Configuração do armazenamento dos arquivos de imagem utilizando multer
const storage = multer.diskStorage({
  // Função para determinar o diretório onde os arquivos serão salvos
  destination: function (req, file, cb) {
    // Define o diretório 'uploads/' para salvar as imagens
    cb(null, 'uploads/'); 
  },
  // Função para definir o nome do arquivo na hora de salvar
  filename: function (req, file, cb) {
    // Utiliza o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Configuração do middleware multer, definindo onde os arquivos serão salvos
// e utilizando a configuração de 'storage' acima
const upload = multer({ dest: "./uploads", storage });

// Função para configurar as rotas do servidor
const routes = (app) => {
  // Habilita o middleware express.json() para que o servidor entenda o corpo das requisições em formato JSON
  app.use(express.json());

  // Rota para listar todos os posts. Ao acessar 'GET /posts', a função listarPosts será chamada
  app.get('/posts', listarPosts);

  // Rota para criar um novo post. Ao acessar 'POST /posts', a função postarNovoPost será chamada
  app.post('/posts', postarNovoPost);

  // Rota para fazer upload de imagens. Ao acessar 'POST /upload', a função uploadImagem será chamada.
  // O arquivo enviado será manipulado pelo multer e a função uploadImagem será executada após o upload
  app.post("/upload", upload.single("imagem"), uploadImagem);
}

// Exporta as rotas para serem usadas no servidor principal
export default routes;
