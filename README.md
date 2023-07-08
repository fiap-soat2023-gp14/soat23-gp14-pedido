# soat2023-gp14
### Pós Graduação - Software Archictecture / FIAP 2023/1 - Grupo 14
>  Projeto em construção

#### COMPONENTES:
- Alyne Salgado Scotini Rozario - RM349570
- Luciana Araujo Agripino e Silva - RM350593 
- Maria Luísa Souza Matos - RM349700 
- Silverton dos Santos Gimenes - RM349968
- Vinicius Gabriel Nogueira Hoffmann - RM349665 

### ENTREGA FASE 1
1. Documentação do sistema (DDD):
   - [Link do Board do Miro com Contextos Delimitados](https://miro.com/app/board/uXjVMLGA6LU=/)
     - /soat2023-gp14-main/Contextos-Delimitados-Fase -1.pdf
   - WIKI com dicionário e linguagem ubíqua 
     - /soat2023-gp14-main/WIKI-Fase1-gp14.pdf
2. Uma aplicação para todo o sistema Backend
   - Postman Collection 
     - /soat2023-gp14-main/SOAT2 - GRUPO 14 - FASE 1.postman_collection.json

### Descrição do Projeto
Aplicação desenvolvida em nodejs com o objetivo de acessar o menu de uma lanchonete.

### O que a Plataforma é capaz de fazer?

- Cadastrar cliente

- Identificar cliente via CPF

- Selecionar produtos:

- Fake checkout


### Pré-requisitos e como rodar a aplicação

- Faça o download do repositório através do arquivo zip ou do terminal usando o git clone;
- Acesse o diretório do projeto pelo seu terminal;
- Rode o comando npm init para inicializar o npm dentro do projeto. É necessário ter o Noje.js instalado para executar este projeto.
- Rode o comando npm install -g json-server para instalar as dependências.
- Rode o comando json-server --watch db.json para iniciar o servidor
- Para executar a API apenas execute: 
  - docker-compose up -d ou
  - docker-compose -f docker-compose.yaml up -d mongodb > cd fiap-application > yarn start:dev