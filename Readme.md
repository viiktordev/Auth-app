# Sobre o projeto

> Este projeto consiste em uma API que controla o processo de autenticação em uma aplicação.


# Tecnologias e Bibliotecas

* [**Node.js**](https://nodejs.org/en/)
* [**MongoDB**](https://www.mongodb.com/)
* [**Mongoose**](https://mongoosejs.com/)
* [**Bcryptjs**](https://www.npmjs.com/package/bcryptjs)
* [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
* [**ESlint**](https://eslint.org/)
* [**Jest**](https://jestjs.io/)
* [**Yup**](https://www.npmjs.com/package/yup)
* [**Prettier**](https://prettier.io/)
* [**Dotenv**](https://www.npmjs.com/package/dotenv)


# Setup


1. Instale o yarn:

        $ npm install yarn -g

2. Na raiz do projeto execute o comando:

        $ yarn

3. Crie um arquivo .env para configuração das variáveis de ambiente seguindo o exemplo contido no arquivo .env.example.

4. O mesmo vale para o ambiente de testes, crie um .env.test para esse caso.

5. Para iniciar o projeto execute:

        $ yarn start


# Endpoints

[**Utilize esse link para testar a aplicação**](https://auth-app-teste.herokuapp.com/)

## **POST - /sign-up**

> Este endpoint faz a criação e autentica o usuário para o primeiro acesso.

**Request body**
```json
{
	"nome":"seu_nome",
	"email":"seuemail@valido.com",
	"senha":"min8digitos",
	"telefones": [{
		"ddd":"11",
		"numero":"999999999"
	}]
}
```

**Response Status**

* **200 Ok** - Token Jwt
* **400 Bad Request** - Consultar mensagem de erro.

## **POST - /sign-in**

> Este autentica o usuário utilizando e-mail e senha.

**Request body**
```json
{
	"email":"seuemail@valido.com",
	"senha":"min8digitos"
}
```

**Response Status**

* **200 Ok** - Token Jwt
* **400 Bad Request** - Consultar mensagem de erro.
* **401 Not Authorized** - E-mail ou senha incorretos.


## **GET - /users**

> Este retorna as informações do usuário que o chamou.

**Request body**
```json
{
	"email":"seuemail@valido.com",
	"senha":"min8digitos"
}
```

**Response Status**

* **200 Ok** - Token Jwt
* **400 Bad Request** - consultar mensagem de erro.
* **401 Not Authorized** - Problema no token

