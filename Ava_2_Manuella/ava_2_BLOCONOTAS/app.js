// Função para carregar as notas

//VIDEO DO YT QUE EU USEI https://youtu.be/XgUlnoPresc?si=gXW6HEcglzMaCJUP
function carregarNotas() {
    const notas = JSON.parse(localStorage.getItem('notas')) || [];
     // localStorage.getItem('notas'): pega as notas armazenadas no localStorage do navegador
    // com a chave 'notas'. Se não houver nada armazenado,
    //  o JSON.parse converte o valor null para um array vazio ([]).
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = ''; // limpa a lista antes de adicionar as notas

    notas.forEach((nota, indice) => { //forEach é um método que executa a função em cada item da lista, um loop
        const li = document.createElement('li');//ve a posicao do item na lista
        
        // Mostra título e conteúdo da nota na lista
        li.innerHTML = `
            <strong>${nota.titulo}</strong><br>
            <p>${nota.conteudo}</p>
        `;

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirNota(indice);

        li.appendChild(botaoExcluir); // adicionar o botão de excluir dentro do item da lista (li)
        listaNotas.appendChild(li);

        // quando a nota for clicada, mostra o conteúdo no campo de edição
        li.onclick = () => {
            document.getElementById('campoNota').value = nota.conteudo; 
            document.getElementById('conteudoNota').style.display = 'block'; 
            indiceNotaAtual = indice; 
        };
    });
}

// Função para criar uma nova nota
function criarNota() {
    document.getElementById('campoNota').value = ''; // limpa o campo
    document.getElementById('conteudoNota').style.display = 'block'; 
    indiceNotaAtual = -1; //menos 1 pq a lista começa em 0
}

// Função para salvar ou editar a nota
function salvarNota() {
    const conteudo = document.getElementById('campoNota').value.trim(); //funcao pra ver se tem algo em branco trim
    if (!conteudo) {
        alert('A nota não pode estar vazia!');
        return;
    }

    const notas = JSON.parse(localStorage.getItem('notas')) || [];
    if (indiceNotaAtual === -1) {
        
        notas.push({ titulo: `Nota ${notas.length + 1}`, conteudo });
    } else {
        
        notas[indiceNotaAtual].conteudo = conteudo;
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    document.getElementById('conteudoNota').style.display = 'none'; // esconde a escrita que tava dizendo para digitar
    carregarNotas(); 
    indiceNotaAtual = -1; 
}

// Função para excluir uma nota
function excluirNota(indice) {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        notas.splice(indice, 1); // splice é para remover a nota
        localStorage.setItem('notas', JSON.stringify(notas));
        carregarNotas(); 
    }
}

// variável para controlar o índice da nota que está sendo editada
let indiceNotaAtual = -1;


document.getElementById('novaNotaBtn').onclick = criarNota;
document.getElementById('salvarBtn').onclick = salvarNota;

// evento de JS que carrega as notas ao iniciar a página
window.onload = carregarNotas;
