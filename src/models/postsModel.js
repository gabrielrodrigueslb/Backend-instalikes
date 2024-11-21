// Importa a função para conectar ao banco de dados, que contém a lógica de conexão com o MongoDB
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão armazenada na variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // A string de conexão é passada para o método de conexão

// Função assincrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados 'instabytes' para realizar a consulta
  const db = conexao.db('instabytes');
  
  // Seleciona a coleção 'posts', onde os posts estão armazenados
  const colecao = db.collection('posts');
  
  // Busca todos os documentos dentro da coleção 'posts' e retorna como um array
  return colecao.find().toArray(); 
}

// Função assincrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'instabytes' para realizar a operação
  const db = conexao.db('instabytes');
  
  // Seleciona a coleção 'posts', onde os posts serão inseridos
  const colecao = db.collection('posts'); 
  
  // Insere o novo post na coleção 'posts' e retorna o resultado da inserção
  return colecao.insertOne(novoPost);
}
