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

        if (categoria === "Pista" && preco < 100) {
            return res.status(400).json({ message: "Preço mínimo para categoria Pista é R$ 100,00." });
        }
        else if (categoria === "Pista Vip" && preco < 200) {
            return res.status(400).json({ message: "Preço mínimo para categoria Pista Vip é R$ 200,00." });
        }
        else if (categoria === "Camarote" && preco < 300) {
            return res.status(400).json({ message: "Preço mínimo para categoria Camarote é R$ 300,00." });
        }
        else if (categoria === "Arquibancada" && preco < 80) {
            return res.status(400).json({ message: "Preço mínimo para categoria Arquibancada é R$ 80,00." });
        }

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
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updateIngresso = await ingressoModel.updateIngresso(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updateIngresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updateIngresso);  
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

const realizarVenda = async (req, res) => {
    try {
        const { id, quantidade } = req.body;
        const ingresso = await ingressoModel.getIngressoById(id);

        if (!ingresso) {
            return res.status(404).json({ message: "Ingresso não encontrado." });
        }

        if (ingresso.quantidade_disponivel < quantidade) {
            return res.status(400).json({ message: "Ingressos insuficientes para a venda." });
        }

        ingresso.quantidade_disponivel -= quantidade;
        const updateIngresso = await ingressoModel.updateIngresso(id, ingresso.evento, ingresso.local, ingresso.data_evento, ingresso.categoria, ingresso.preco, ingresso.quantidade_disponivel);

        res.status(200).json({
            mensagem: "Compra realizada com sucesso!",
            evento: updateIngresso.evento,
            categoria: updateIngresso.categoria,
            quantidade_comprada: quantidade,
            quantidade_restante: updateIngresso.quantidade_disponivel
        });
    } catch (error) {
        console.error("Erro ao realizar venda:", error);
        res.status(500).json({ message: "Erro ao realizar venda." });
    }
};

module.exports = { getAllIngressos, getIngresso, createIngresso, updateIngresso, deleteIngresso, realizarVenda };


