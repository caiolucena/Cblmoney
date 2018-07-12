CREATE TABLE pessoa(

codigo BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
ativo boolean NOT NULL,
logradouro VARCHAR(50),
numero VARCHAR(10),
complemento VARCHAR(20),
bairro VARCHAR(20),
cep VARCHAR(9),
cidade VARCHAR(30),
estado VARCHAR(20)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
