function pegarCarrinho() {
    var carrinhoSalvo = localStorage.getItem("carrinhoBobblePop");

    if (carrinhoSalvo) {
        try {
            return JSON.parse(carrinhoSalvo);
        } catch (erro) {
            return [];
        }
    }

    return [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinhoBobblePop", JSON.stringify(carrinho));
}

function pegarProdutosCadastrados() {
    var produtosSalvos = localStorage.getItem("produtosBobblePop");

    if (!produtosSalvos) {
        return null;
    }

    try {
        return JSON.parse(produtosSalvos);
    } catch (erro) {
        return null;
    }
}

function atualizarCatalogoPeloCrud() {
    var produtos = pegarProdutosCadastrados();

    if (!produtos) {
        return;
    }

    var ids = produtos.map(function (produto) {
        return String(produto.id);
    });
    var itens = document.querySelectorAll("[data-produto-id]");

    for (var i = 0; i < itens.length; i++) {
        if (ids.indexOf(itens[i].getAttribute("data-produto-id")) === -1) {
            itens[i].remove();
        }
    }
}

function pegarNomeProduto(item) {
    var spans = item.querySelectorAll("span");

    for (var i = 0; i < spans.length; i++) {
        var span = spans[i];
        var texto = "";

        for (var j = 0; j < span.childNodes.length; j++) {
            if (span.childNodes[j].nodeType === 3) {
                texto = texto + span.childNodes[j].textContent;
            }
        }

        texto = texto.trim();

        if (texto !== "" && !span.classList.contains("preco") && !span.classList.contains("oferta") && !span.classList.contains("corta")) {
            return texto;
        }
    }

    return "Produto";
}

function adicionarAoCarrinho(nome, preco, imagem) {
    var carrinho = pegarCarrinho();
    var produto = {
        id: Date.now() + carrinho.length,
        nome: nome,
        preco: preco,
        imagem: imagem
    };

    carrinho.push(produto);
    salvarCarrinho(carrinho);
}

function configurarBotoesCompra() {
    var botoes = document.querySelectorAll('button[name="comprar"]:not([disabled])');

    for (var i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", function () {
            var item = this.closest(".item");

            if (!item) {
                return;
            }

            var imagem = item.querySelector("img");
            var preco = item.querySelector(".preco");
            var nomeProduto = pegarNomeProduto(item);
            var precoProduto = preco ? preco.textContent.trim() : "R$ 0,00";
            var imagemProduto = imagem ? imagem.getAttribute("src") : "";

            adicionarAoCarrinho(nomeProduto, precoProduto, imagemProduto);
        });
    }
}

function converterPreco(preco) {
    var numero = preco.replace("R$", "").replace(".", "").replace(",", ".").trim();
    var valor = parseFloat(numero);

    if (isNaN(valor)) {
        return 0;
    }

    return valor;
}

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function removerDoCarrinho(id) {
    var carrinho = pegarCarrinho();
    var novoCarrinho = carrinho.filter(function (produto) {
        return produto.id !== id;
    });

    salvarCarrinho(novoCarrinho);
    mostrarCarrinho();
}

function criarItemCarrinho(produto) {
    var item = document.createElement("div");
    item.className = "item";

    var imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;

    var nome = document.createElement("span");
    nome.textContent = produto.nome;

    var preco = document.createElement("span");
    preco.className = "preco";
    preco.textContent = produto.preco;

    var botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "remover-item";
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", function () {
        removerDoCarrinho(produto.id);
    });

    item.appendChild(imagem);
    item.appendChild(document.createElement("br"));
    item.appendChild(nome);
    item.appendChild(document.createElement("br"));
    item.appendChild(preco);
    item.appendChild(botaoRemover);

    return item;
}

function mostrarCarrinho() {
    var lista = document.getElementById("lista-carrinho");
    var totalProdutos = document.getElementById("total-produtos");
    var totalCarrinho = document.getElementById("total-carrinho");

    if (!lista) {
        return;
    }

    var carrinho = pegarCarrinho();
    var total = 0;

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        var vazio = document.createElement("div");
        vazio.className = "item carrinho-vazio";
        vazio.textContent = "Nenhum produto no carrinho.";
        lista.appendChild(vazio);
    }

    for (var i = 0; i < carrinho.length; i++) {
        total = total + converterPreco(carrinho[i].preco);
        lista.appendChild(criarItemCarrinho(carrinho[i]));
    }

    if (totalProdutos) {
        totalProdutos.textContent = formatarPreco(total);
    }

    if (totalCarrinho) {
        totalCarrinho.textContent = formatarPreco(total);
    }
}

function configurarBotaoLimparCarrinho() {
    var botao = document.getElementById("limpar-carrinho");

    if (!botao) {
        return;
    }

    botao.addEventListener("click", function () {
        salvarCarrinho([]);
        mostrarCarrinho();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarCatalogoPeloCrud();
    configurarBotoesCompra();
    mostrarCarrinho();
    configurarBotaoLimparCarrinho();
});
