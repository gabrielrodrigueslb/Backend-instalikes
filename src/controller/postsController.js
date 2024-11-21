// Importa as funções do modelo que manipulam os posts no banco de dados
import { getTodosPosts, criarPost } from "../models/postsModel.js";
// Importa o módulo 'fs' para manipulação de arquivos no sistema
import fs from "fs"

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    // Obtém todos os posts do banco de dados
    const posts = await getTodosPosts(); 
  
    // Envia os posts como resposta JSON com status 200 (OK)
    res.status(200).json(posts); 
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
    // Cria um novo post a partir dos dados enviados no corpo da requisição
    const novoPost = req.body;

    try {
        // Chama a função 'criarPost' para adicionar o novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        
        // Envia a resposta com o post recém-criado e o status 200 (OK)
        res.status(200).json(postCriado);
    } catch (erro) {
        // Se ocorrer um erro, exibe a mensagem no console e envia o status 500 (erro interno)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

// Função assíncrona para realizar o upload da imagem
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post, incluindo o nome do arquivo da imagem que foi enviada
    const novoPost = {
        descricao: "", // Aqui poderia ser uma descrição, mas está vazia
        imrUrl: req.file.originalname, // O nome da imagem recebida
        alt: "" // Atributo 'alt' da imagem, também vazio
    }; 

    try {
        // Cria o post no banco de dados com os dados fornecidos, incluindo o nome da imagem
        const postCriado = await criarPost(novoPost);
        
        // Define o caminho onde a imagem será salva, utilizando o id gerado no banco
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        
        // Renomeia o arquivo da imagem para o novo nome gerado, movendo-o para a pasta correta
        fs.renameSync(req.file.path, imagemAtualizada);
        
        // Envia a resposta com o post recém-criado, incluindo a imagem renomeada
        res.status(200).json(postCriado);
    } catch (erro) {
        // Se ocorrer um erro, exibe a mensagem no console e envia o status 500 (erro interno)
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}
