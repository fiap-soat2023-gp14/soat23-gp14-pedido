# soat2023-gp14
### Pós Graduação - Software Archictecture / FIAP 2023/1 - Grupo 14

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

### ENTREGA FASE 2
1. Arquivos de configuração do Kubernetes
   - /soat2023-gp14/fiap-k8s
2. Atualizar a aplicação desenvolvida na Fase 1 refatorando o código para seguir os
padrões Clean Code e Clean Architecture
    - /soat2023-gp14/fiap-application

### ENTREGA FASE 3
1. Diagrama de arquitetura

### Descrição do Projeto
Aplicação desenvolvida em nodejs com o objetivo de acessar o menu de uma lanchonete.

### O que a Plataforma é capaz de fazer?

- Cadastrar cliente

- Identificar cliente via CPF

- Criar, editar, listar e remover produtos

- Fake checkout

- Listar pedidos


### Pré-requisitos e como rodar a aplicação

- Faça o download do repositório através do arquivo zip ou do terminal usando o git clone;
- Acesse o diretório do projeto pelo seu terminal;
- Existem duas opções para executar o projeto:
1. Usando K8s:
   - Para Criar: make -f Makefile create-stack
   - Para Deletar: make -f Makefile delete-stack
   - Port para testes: make -f Makefile port-forward

     
2. Executando o projeto manualmente:
   - docker-compose -f docker-compose.yaml up -d mongodb 
   - cd fiap-application
   - source local.env
   - yarn install
   - yarn start:dev

OBS: A aplicação está disponivel na porta 8080, use a collection do Postman Collection
      - /soat2023-gp14-main/SOAT2 - GRUPO 14 - soat_gp14_fase_2.postman_collection.json