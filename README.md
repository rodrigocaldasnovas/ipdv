### DESAFIO ###

1- CRIAR um usuário, cargo, departamento e um centro de custo; 

2- LISTAR os usuários existentes por departamento , listar os departamentos existentes por centro de custo; 

3- ATUALIZAR os dados desse usuário, departamento e centro de custo ; 

4- DELETAR esse usuário, departamento e centro de custo. 

5- E por ultimo importar uma lista de funcionários  atrelados ao seu respectivo departamento e centro de custo. 

A aplicação deverá usar um token de sessão que devera expirar em 60 minutos sendo necessário renova-lo. 
O front-end poderá preferivelmente deve ser feito em VueJs ou pode optar por utilizar qualquer framework/linguagem  ou até mesmo  HTML, CCS e Java Script. 

O back-end deve ser feito em PHP utilizando o bootstrap ou sem nenhum framework e/nodeJs. 
Layout e design ficam a sua escolha. 

Modelar o banco de dados e encaminhar o diagrama Entidade Relacionamento. 
Por ser um CRUD acredito que o ideal seria usar uma lib de banco para não escrever tanta código SQL, mas fica por conta do candidato. Caso use alguma lib informar qual. 

## Requisitos do teste ##
Informar quais frameworks esta utilizando e também quais plugins, libs e qualquer outra ferramenta. 
Caso seja em NodeJS informar se esta utilizando o YARN ou o NPM e disponibilizar junto os pacotes com os módulos ( package.json e nodemodules ) . 

Ao final do teste subir para o GitHub e nos encaminhar o repositório em modo publico com as informações de instalação ou configurações no arquivo read.me 



### RESOLUÇÃO DO TESTE ###

Criação do banco de dados em Postgres, esquema abaixo:

<p align="center"><img src="https://github.com/rodrigocaldasnovas/ipdv/blob/main/diagrama.bmp" ></p>


As DDLs do esquema estão no arquivo esquema.sql, no diretorio principal do repositório. 

É possível criar as tabelas executando o arquivo esquema.sql

Tecnologias:

    Controlador de pacotes usado foi o NPM.

    NodeJS no backend ("nodemon": "^2.0.19")
        * Scaffold gerado por express-generate
        - Framework express ("express": "~4.16.1")
        - pacotes terceiros 
            "bcrypt": "^5.0.1",
            "cookie-parser": "~1.4.4",
            "cors": "^2.8.5",
            "debug": "~2.6.9",
            "dotenv": "^16.0.1",
            "express": "~4.16.1",
            "http-errors": "~1.6.3",
            "jade": "~1.11.0",
            "jsonwebtoken": "^8.5.1",
            "morgan": "~1.9.1",
            "multer": "^1.4.5-lts.1",
            "nodemon": "^2.0.19",
            "pg": "^8.7.3",
            "pg-hstore": "^2.3.4",
            "sequelize": "^6.21.3",
            "sequelize-cli": "^6.4.1"

    Tudo registrado no package, bastanto usar o comando: npm install   

    para iniciar o servidor usar: npm run dev     


    banco de dados: POSTGRES 11 (ACREDITO QUE SEM PROBLEMAS COM OUTRAS VERSOES)

        Arquivo esquema.sql em anexo para criacao das tabelas e na raiz do projeto serve (nodejs), 
        aquivo .env para setar configurações necessárias.

    VueJs no frontend

        vue gerado vue-cli
        usando pacotes basicos
            "axios": "^0.27.2",
            "core-js": "^3.8.3",
            "vue": "^2.6.14",
            "vue-router": "^3.5.1",
            "vuex": "^3.6.2",
            "vuex-map-fields": "^1.4.1",
            "vuex-persist-indexeddb": "^0.1.3"

        pode ser instalado usando: npm install

        para execucao: npm run serve

        Arquivo .env para setar endereco do servidor nodejs, apenas se necessário mudanças.
        

** ATENCAO ARQUIVO .ENV DEIXADO NO GITIGNORE DE PROPROSITO PARA FACILITAR NA USABILIDADE DO TESTE  