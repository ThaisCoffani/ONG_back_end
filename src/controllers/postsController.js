import {
    getTodosPosts,
    buscarPostPorID,
    buscarPostsPorCategoria,
    criarPost,
    atualizarPost
} from "../models/postsModels.js";
import fs from "fs";

export async function listarPosts(req, res, conexao) {
    try {
        const posts = await getTodosPosts(conexao);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar posts." });
    }
}

export async function listarPostPorID(req, res, conexao) {
    try {
        const { id } = req.params;
        const post = await buscarPostPorID(id, conexao);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post não encontrado." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar post." });
    }
}

export async function listarPostsPorCategoria(req, res, conexao) {
    try {
        const { categoria } = req.params;
        const posts = await buscarPostsPorCategoria(categoria, conexao);

        if (posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "Categoria não encontrada." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar posts por categoria." });
    }
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function uploadImagem(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    const novoPost = {
        nome: "",
        cidade: "",
        descricao: "",
        idade: "",
        image: req.file.originalname,
        raca: "",
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const post = {
            image: urlImagem,
            nome: req.body.nome,
            cidade: req.body.cidade,
            descricao: req.body.descricao,
            idade: req.body.idade,
            raca: req.body.raca,
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}