const ingressoModel = require("../models/ingressoModel");

const getAllIngressos = async (req, res) => {
    try {
        const ingressos = await ingressoModel.getIngressos();
        res.json(ingressos);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar ingressos." });
    }
};

const getIngresso = async (req, res) => {
    try {
        const ingresso = await ingressoModel.getIngressoById(req.params.id);
        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(ingresso);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ingresso." });
    }
};

const createIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newIngresso = await ingressoModel.createIngresso(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newIngresso);
    } catch (error) {
	 console.log(error);
        if (error.code === "23505") { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "E-mail já cadastrado." });
        }
        res.status(500).json({ message: "Erro ao criar ingresso." });
    }
};

const updateIngresso = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivell } = req.body;
        const updatedIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivell);
        if (!updatedIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedIngresso);  
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar ingresso." });
    }
};

const deleteIngresso = async (req, res) => {
    try {
        const message = await ingressoModel.deleteIngresso(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar ingresso." });
    }
};

module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso };


