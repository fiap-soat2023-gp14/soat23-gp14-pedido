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
   - WIKI com dicionário e linguagem ubíqua 
2. Uma aplicação para todo o sistema Backend

### ENTREGA FASE 2
1. Arquivos de configuração do Kubernetes
2. Atualizar a aplicação desenvolvida na Fase 1 refatorando o código para seguir os
padrões Clean Code e Clean Architecture
    - /soat2023-gp14/fiap-application

### ENTREGA FASE 3
1. Vídeos e documentação disponível no drive
    - https://drive.google.com/drive/folders/1eCyaAoSrPSkFK8s1atDo6YCKTueJKw0_?usp=sharing

### ENTREGA FASE 4
1. Vídeos e documentação disponível no drive
   - https://drive.google.com/drive/folders/1LUgq-fxnwTRKA8Rb5av0lw_ndFKvOGYO?usp=sharing
2. Criação/divisão dos microsserviços em seus respectivos repositórios:
   - Pedido;
   - Produto;
   - Cliente;
   - Pagamento.
3. BDD
4. Regras aplicadas:
   - Main protegida;
   - Validação do build da aplicação e qualidade do código com o sonarqube;
   - Deployments de todos os microsserviços automatizados.

### ENTREGA FASE 5
1. Vídeos e documentação disponível no drive
   - [ADD LINK]
2. Microsserviços em seus respectivos repositórios:
   - Lambda / Autenticação;
   - Pedido;
   - Produto;
   - Cliente;
   - Pagamento.
4. SAGA com SQS.
5. Endpoints para anonimização dos dados.

### Descrição do Projeto
Aplicação desenvolvida em nodejs com o objetivo de acessar o menu de uma lanchonete.

### O que a Plataforma é capaz de fazer?

- Cadastrar cliente

- Identificar cliente via CPF

- Criar, editar, listar e remover produtos

- Fake checkout

- Listar pedidos

- Anonimizar dados do cliente


### Pré-requisitos e como rodar a aplicação

- Faça o download do repositório através do arquivo zip ou do terminal usando o git clone;
- Acesse o diretório do projeto pelo seu terminal;
- Executando o projeto manualmente:
   - docker-compose -f docker-compose.yaml up -d mongodb 
   - cd fiap-application
   - source local.env
   - yarn install
   - yarn start:dev

OBS: A aplicação está disponivel na porta 8080, use a collection do Postman Collection
      - /soat2023-gp14-main/SOAT2 - GRUPO 14 - soat_gp14_fase_5.postman_collection.json