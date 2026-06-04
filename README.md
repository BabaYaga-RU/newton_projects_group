# BobblePop Store

## Objetivo do sistema

Esse projeto é um site simples de e-commerce feito para a matéria de Programação Web.

A ideia do sistema é simular uma loja online chamada BobblePop Store. O site tem página inicial, página de produtos, carrinho, contato e também uma tela de cadastro de produtos usando React.

O carrinho funciona de forma simples: quando o usuário clica em comprar, o produto vai para o carrinho usando o armazenamento do navegador.

## Funcionalidades

- Página inicial com alguns produtos em destaque
- Página com a lista de produtos
- Botão de comprar enviando o produto para o carrinho
- Carrinho mostrando os produtos selecionados
- Total do carrinho calculado automaticamente
- Botão para limpar o carrinho
- Página de contato
- CRUD de produtos em React, com cadastrar, listar, editar e excluir

## Tecnologias utilizadas

- HTML para montar as páginas
- CSS para a parte visual do site
- JavaScript para fazer o carrinho funcionar
- React.JS por CDN para fazer o CRUD de produtos
- LocalStorage para guardar os produtos do carrinho e do CRUD no navegador
- Lottie Web Component usado nas animações da página inicial

## Como executar

Não precisa instalar nada para rodar o projeto.

1. Baixe ou clone o repositório.
2. Abra a pasta do projeto no computador.
3. Abra o arquivo `index.html` no navegador.
4. Para ver os produtos, acesse `products.html`.
5. Para ver o carrinho, acesse `cart.html`.
6. Para acessar o CRUD, abra `crud-produtos.html` ou clique em Gerenciar produtos na página de produtos.

## Observação

O projeto foi feito usando arquivos HTML, CSS e JavaScript simples. Como não tem backend, os dados ficam salvos no navegador usando LocalStorage.
