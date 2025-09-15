# 🧪 Automação de Testes com Playwright

Este repositório contém um projeto de automação de testes utilizando [Playwright](https://playwright.dev/) do curso Playwright Zombie+ - Fernando Papito [Playwright Zombie+ - Udemy](https://www.udemy.com/course/playwright-zombie).  
Seguindo boas práticas como o **padrão Page Objects** e geração de dados dinâmicos, o projeto foi desenhado para ser de fácil manutenção e extensível.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** – Ambiente de execução para JavaScript.
- **JavaScript** – Linguagem principal para escrita dos testes.
- **Playwright** – Framework para automação de testes end-to-end.
- **Faker.js** – Geração de dados dinâmicos e aleatórios.
- **PostgreSQL** – Banco de dados para persistência/consulta de informações.

---

## 📂 Estrutura do Projeto

A estrutura segue uma organização modular para facilitar manutenção e escalabilidade:

├── tests/
│ ├── e2e/ # Especificações de testes (cenários)
│ └── support/ # Recursos de suporte
│   ├── fixtures/ # Massa de dados e mocks
│   ├── pages/ # Page Objects (elementos e ações de páginas)
│   ├── db.js # Conexão com banco de dados PostgreSQL
│   └── index.js # Registro e exportação dos Page Objects
│
├── playwright.config.js # Configurações do Playwright
├── package.json # Dependências e scripts
└── README.md # Documentação do projeto


🔑 **Padrão Page Objects:**  
Os arquivos da pasta `pages/` contêm os seletores e métodos de interação de cada página.  
O arquivo `index.js` centraliza a configuração e exportação desses objetos para facilitar seu uso nos testes.

---