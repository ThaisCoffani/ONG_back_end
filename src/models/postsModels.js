import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js"
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

import { ObjectId } from "mongodb";

export async function getTodosPosts(conexao) {
    const db = conexao.db("ONG");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function buscarPostPorID(id, conexao) {
    const db = conexao.db("ONG");
    const colecao = db.collection("posts");
    return colecao.findOne({ id: Number(id) });
}

export async function buscarPostsPorCategoria(categoria, conexao) {
    const db = conexao.db("ONG");
    const colecao = db.collection("posts");
    return colecao.find({ categoria: { $regex: new RegExp(categoria, "i") } }).toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("ONG");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("ONG");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}