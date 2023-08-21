const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista-js');
let listaItens = JSON.parse(localStorage.getItem("listaDeItens")) || [];

listaItens.forEach(element => {
    criarElemento(element);
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const qtd = evento.target.elements['quantidade'];

    const existe = listaItens.find((elemento) => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": qtd.value
    }

    if (existe) {
        itemAtual.id = existe.id;

        atualizarQuantidade(itemAtual);
        listaItens[listaItens.findIndex((elemento) => elemento.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = listaItens[listaItens.length - 1] ? (listaItens[listaItens.length -1]).id + 1 : 0;

        criarElemento(itemAtual);

        listaItens.push(itemAtual);
    }

    localStorage.setItem("listaDeItens", JSON.stringify(listaItens));

    nome.value = '';
    qtd.value = '';

})

function criarElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const novaQtd = document.createElement('strong');
    novaQtd.innerHTML = item['quantidade'];
    novaQtd.dataset.id = item.id;
    novoItem.appendChild(novaQtd);
    novoItem.innerHTML += item['nome'];

    lista.appendChild(novoItem);

    novoItem.appendChild(botaoDeletar(item.id));
}

function atualizarQuantidade(item){
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item['quantidade'];
}

function botaoDeletar(id){
    const botao = document.createElement('button');
    botao.innerText = 'X';

    botao.addEventListener("click", function(){
        deletarElemento(this.parentNode, id);
    })

    return botao;
}

function deletarElemento(tag, id){
    tag.remove();

    listaItens.splice(listaItens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("listaDeItens", JSON.stringify(listaItens));
}
