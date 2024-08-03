// Lista dos Pratos
var prods = [
  { id: 1, nome: "Bife com batata", preco: 30.0 },
  { id: 2, nome: "Coxa de Frango Crocante", preco: 25.0 },
  { id: 3, nome: "Carne de Panela", preco: 22.0 },
  { id: 4, nome: "Farofa", preco: 10.0 },
  { id: 5, nome: "Salada", preco: 8.0 },
  { id: 6, nome: "Torresmo", preco: 12.0 },
];

//pegar os inputs
function Calcular() {
  const quantidade = document.querySelectorAll(".buttons_added");
  const nomeCliente = document.querySelector("#inName").value;
  const respNome = document.querySelector(".resp1");
  const dadosPedido = document.querySelector(".resp2");
  const respPedido = document.querySelector(".resp3");
  const precoFinal = document.querySelector(".resp4");
  let total = 0;

  // Limpar os conteúdos anteriores
  respNome.innerHTML = "";
  dadosPedido.innerHTML = "";
  respPedido.innerHTML = "";

  // Adicionar o nome do cliente
  respNome.innerHTML = `Caro(a) <strong>${nomeCliente}</strong>,`;

  //Texto do pedido
  dadosPedido.innerHTML = `Seguem os dados do seu pedido.</br>Você escolheu:</br>`;

  //Calcular Quantidade
  quantidade.forEach((form) => {
    let id = form.querySelector(".input-text").id;
    let qtd = parseInt(form.querySelector(".input-text").value, 10) || 0;
    let prato = prods.find((p) => p.id == id);

    if (prato && qtd > 0) {
      let subtotal = prato.preco * qtd;
      respPedido.innerHTML += `<li>${qtd}x ${
        prato.nome
      } de R$${prato.preco.toFixed(2)}. <strong>Total: ${subtotal.toFixed(
        2
      )}</strong></li></br>`;
      total += subtotal;
    }
  });

  // Exibir o valor total final após o loop
  respPedido.innerHTML += `<p><strong>Valor Total: R$${total.toFixed(
    2
  )}</strong></p>`;

  // Mostrar o Valor Total do Pedido
  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  precoFinal.innerHTML = `<h2>Preço Final: ${formatter.format(
    total.toFixed(2)
  )}</h2>`;
}

// Adicionar eventos após o DOM estar carregado
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-calc").addEventListener("click", Calcular);

  // Função para atualizar a quantidade
  function updateQuantity(element, delta) {
    const input = element.parentElement.querySelector(".input-text");
    let qtd = parseInt(input.value, 10);
    qtd = Math.max(0, qtd + delta); // Não permitir quantidade negativa
    input.value = qtd;
  }

  //Adicionar eventos de cliques nos botões "+" e "-"
  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this, -1);
    });
  });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this, 1);
    });
  });
});
