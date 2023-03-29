-- public.pessoa definition

-- Drop table

-- DROP TABLE pessoa;

CREATE DATABASE cadastros;

CREATE TABLE pessoa (
	id serial4 NOT NULL,
	cpf text NOT NULL,
	rg text NOT NULL,
	cep text NOT NULL,
	logradouro text NOT NULL,
	complemento text NOT NULL,
	setor text NOT NULL,
	cidade text NOT NULL,
	uf text NOT NULL,
	nome text NOT NULL
);

-- public.telefones definition

-- Drop table

-- DROP TABLE telefones;

CREATE TABLE telefones (
	id serial4 NOT NULL,
	telefone text NOT NULL,
	descricao text NOT NULL,
	pessoaid int4 NOT NULL
);