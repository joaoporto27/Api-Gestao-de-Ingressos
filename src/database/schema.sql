CREATE DATABASE gestao;

\c gestao;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel)
VALUES
    ('Show do Thiaguinho', 'Allianz Parque', '20-03-2025', 'Pista', 100.00, 1000),
    ('Show da Turma do Pagode', 'Vila Country', '19-03-2025', 'Camarote', 300.00, 25);