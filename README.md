# Seja bem vindo ao 🐔  Farm UFPR 4.0 - a Arquitetura IoT para granjas de frango de corte.
### Esse é o repositório público oficial - Agro-4.0-UFPR-Doutorado-Lucas

## 🎓 Projeto desenvolvido para a Tese de Lucas José de Souza aluno do PPGGI - Programa de Pós-Graduação em Gestão da Informação da Universidade Federal do Paraná sob a orientação do Professor Dr. Egon W. Wildauer.

O projeto possui 3 repositórios principais:

01- backend - Aqui se encontram os scripts de toda a configuração do servidor,
		      as rotas da API, questão de gestão de acesso, lógicas e regras
			  do negócio.Além disso, o arquivo: rotas-api-insomnia.JSON possui
			  um backup das rotas para testar utilizando o INSOMNIA.

02 - frontend - Nessa pasta estão os repositórios Web e Mobile da aplicação. Para 
				rodar a aplicação mobile é necessário utilizar o aplicativo EXPO no
				seu celular.

03 - dataLogger -  Todos os algoritmos, esquemas elétricos e manual de montagem do
				   data logger se encontram no repositório 03. Dentro dessa pasta
				   tem um outro arquivo para leitura que dá mais detalhes.



## 🚀 Vamos começar

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local (localhost) para fins de desenvolvimento e testes.
Caso queira colocar o Farm UFPR 4.0 em uma hospedagem na internet basta seguir a documentação do provedor contratado, pois esse projeto está pronto para isso.
OBS: Os arquivos são totalmente editáveis 😁

### 📋 Pré-requisitos
Antes de começar verifique se você possui todos os pré requisitos para rodar a aplicação.

```
-> NodeJS (obrigatório)
-> Yarn (recomendável)
-> ReactJS (obrigatório)
-> React Native (obrigatório)
-> Expo (obrigatório)
-> Insomnia (recomendável)
-> ArduinoIDE (obrigatório)
-> VSCODE (recomendável)

```

O manual de instalação encontra-se nesse repositório, mas todos os softwares citados acima podem ser facilmente instalados seguindo tutoriais da internet. 👨‍💻


### 🔧 Instalação

Faça o download do repositório raiz e então... para o back-end acesse o diretório 01 na pasta source e use o comando:
```
yarn dev
```

ou

```
yarn start
```

Para rodar o front WEB ou MOBILE acesse o diretório 02 na pasta source de qual deseja e use o comando:

```
yarn start
```
No caso do front MOBILE você também pode rodar a aplicação utilizando o comando:

```
expo start
```

PS: Para rodar a aplicação mobile tenha um smartphone em mãos com o app EXPO instalado, então basta ler o QR code e aguardar a aplicação rodar.

## 📦 Dica de Implantação

Caso queira rodar o sistema localmente sem precisar de uma hospedagem na internet (geralmente precisamos pagar por isso 🤑) você pode utilizar um notebook ou um Raspberry PI (suportado na versão 2 ou superior).
A aplicação é leve e exige pouco hardware, caso você tenha algum computador (desktop ou portátil) que não utiliza mais use-o como servidor interno.
É seguro e leve.😎

## 💻 Línguagens de Programação utilizadas

* [JavaScript](https://www.javascript.com/) - Utilizada no desenvolvimento do back-end e front-end
* [C](https://www.bell-labs.com/usr/dmr/www/chist.html) - Utilizada no desenvolvimento do Data Logger
* [C++](http://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) - Utilizada no desenvolvimento do Data Logger
* [R](https://www.r-project.org/) - Utilizada para criar uma parte da visualização dos dados e cálculos estatísticos

## 🛠️ Construído com

* [NodeJS](https://nodejs.org/pt-br/) - Rodar JS no back-side
* [ReactJS](https://pt-br.reactjs.org/) - Biblioteca JS para front-end web
* [React Native](https://reactnative.dev/) - Biblioteca JS para front-end mobile
* [ArduinoIDE](https://www.arduino.cc/) - IDE do desenvolvimento para microcontroladores
* [MongoDB](https://www.mongodb.com/) - Banco de dados No-SQL
* [Rstudio] (https://posit.co/downloads/) - IDE de desenvolvimento da programação utilizando Línguagem R
* [Shiny](https://shiny.rstudio.com/tutorial/) - Biblioteca para Línguagem R de visualização dos dados

## 📌 Versão

O controle de versão é feito pelo próprio GitHub. Até o momento da defesa da tese ainda estamos na versão ALFA, testando a arquitetura, coletando e análisando dados.
Em breve a versão final da TESE estará disponível AQUI🧑‍🎓. 

## 🤝 Parcerias

Para parcerias acadêmicas e de negócios entre em contato com os autores 👇

* **Lucas J. Souza** - *lattes* - [curriculo lattes](http://lattes.cnpq.br/8057304667549945). *linkedin* - [linkedin](https://www.linkedin.com/in/souzalucasj/)
* **Egon W. Wildauer** - 

## ✒️ Cola

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Um desenvolvedor** - *Trabalho Inicial* - [umdesenvolvedor](https://github.com/linkParaPerfil)
* **Fulano De Tal** - *Documentação* - [fulanodetal](https://github.com/linkParaPerfil)

Você também pode ver a lista de todos os [colaboradores](https://github.com/usuario/projeto/colaboradores) que participaram deste projeto.

## 📄 Licença

Este projeto está sob a licença (sua licença) - veja o arquivo [LICENSE.md](https://github.com/usuario/projeto/licenca) para detalhes.

## 🙌 Agradecimentos

* Conte a outras pessoas sobre este projeto 📢;
* Convide alguém da equipe para uma cerveja 🍺;
* Um agradecimento publicamente 🫂;
* etc.


---
🧑‍🎓Desenvolvido por [Lucas José de Souza](https://github.com/lucas231090) 🤖
